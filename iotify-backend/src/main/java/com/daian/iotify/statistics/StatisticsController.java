package com.daian.iotify.statistics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iotify/statistics")
@CrossOrigin(origins = {"http://192.168.0.101:3000", "http://mihaiddomain150.go.ro:3000", "http://localhost:3000", "http://192.168.4.1:3000"})
public class StatisticsController {
    private final StatisticsService statisticsService;
    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/get-heat-index/{date}")
    public ResponseEntity<Double> getHeatIndex(@PathVariable String date, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(statisticsService.computeHeatIndex(token, date));
    }
}
