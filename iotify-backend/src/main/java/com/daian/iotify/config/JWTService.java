package com.daian.iotify.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
    private static final String SECRET_KEY = "4584521B3A3B2BBE3A03FB4666642A87D3E8EBCC659D9020B7CC716992EB538B";

    public String extractUsername(String token) {
        if(token.contains("Bearer ")){
            token = token.substring(7);
        }
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver){
        if(token.contains("Bearer ")){
            token = token.substring(7);
        }
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    private String generateToken(Map<String, Object> extractedClaims, UserDetails userDetails){
        return Jwts
                .builder()
                .setClaims(extractedClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // expiration period of 24 hours
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        if(token.contains("Bearer ")){
            token = token.substring(7);
        }
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token){
        if(token.contains("Bearer ")){
            token = token.substring(7);
        }
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        if(token.contains("Bearer ")){
            token = token.substring(7);
        }
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        if(token.contains("Bearer ")){
            token = token.substring(7);
        }
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignKey(){
      byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
      return Keys.hmacShaKeyFor(keyBytes);
    }
}
