
import tensorflow as tf
from tensorflow.keras.models import Sequential, save_model
from tensorflow.keras.layers import *
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.losses import MeanSquaredError
from tensorflow.keras.metrics import RootMeanSquaredError
from tensorflow.keras.optimizers import Adam
from data_manager import get_processed_data
# import matplotlib.pyplot as plt
import os


os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
physical_devices = tf.config.list_physical_devices('GPU')
tf.config.experimental.set_memory_growth(physical_devices[0], True)

x_train, y_train, x_val, y_val, x_test, y_test, n_input, n_features = get_processed_data()

model1 = Sequential()
model1.add(InputLayer((n_input, n_features)))
model1.add(LSTM(100, return_sequences=True))
model1.add(LSTM(100, return_sequences=True))
model1.add(LSTM(50))
model1.add(Dense(8, activation='relu'))
model1.add(Dense(1, activation='linear'))
model1.summary()

early_stop = EarlyStopping(monitor='val_loss', patience=2)
model1.compile(loss=MeanSquaredError(),
               optimizer=Adam(learning_rate=0.0001),
               metrics=RootMeanSquaredError())
model1.fit(x_train, y_train,
           validation_data=(x_val, y_val),
           epochs=10,
           callbacks=[early_stop])
# Display the model history
# losses_df = pd.DataFrame(model1.history.history)
# losses_df.plot(figsize=(10, 6))
# plt.show()

# Save model
save_model(model1, 'LSTM_Models/lstm_univariate.h5')
