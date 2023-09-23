import pandas as pd
from sequential_input import sequential_input_lstm
from normalization import normalize_data_frame


clim = pd.read_csv('weather_data.csv', encoding='iso-8859-1', index_col=0)
clim = clim.reset_index()

df = clim[['Date Time', 'Temperature (°C)']].rename(columns={'Temperature (°C)': 'T', 'Date Time': 'datetime'})
df['datetime'] = pd.to_datetime(df['datetime'])

df_hour_lvl = df[df['datetime'].dt.minute == 0]
df = normalize_data_frame(df_hour_lvl)

n_input = 10
df_min_model_data = df['T']
x, y = sequential_input_lstm(df_min_model_data, n_input)

# Total data count is 82.554
# Training data count is 57.788
x_train, y_train = x[:57788], y[:57788]

# Validation data count is 23.753
x_val, y_val = x[57789:70171], y[57789:70171]

# Test data count is 23.753
x_test, y_test = x[70172:], y[70172:]

n_features = 1

x_train = x_train.reshape(x_train.shape[0], n_input, n_features)
x_val = x_val.reshape(x_val.shape[0], n_input, n_features)


def get_processed_data():
    return x_train, y_train, x_val, y_val, x_test, y_test, n_input, n_features
