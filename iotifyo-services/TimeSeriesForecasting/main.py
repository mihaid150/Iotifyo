import pandas as pd
from data_manager import get_processed_data
from tensorflow.keras.models import load_model
import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
# # Load model
model = load_model('LSTM_Models/lstm_univariate.h5')
x_train, y_train, x_val, y_val, x_test, y_test, n_input, n_features = get_processed_data()

# Reshape the input data to have the correct shape
x_test = x_test.reshape(x_test.shape[0], n_input, n_features)

test_predictions = model.predict(x_test).flatten()

x_test_list = []
for i in range(len(x_test)):
    x_test_list.append(x_test[i][0])

test_predictions_df1 = pd.DataFrame({'X_test': list(x_test_list),
                                     'LSTM Prediction': list(test_predictions)})

# Save the DataFrame to a text file
test_predictions_df1.to_csv('test_predictions.txt', index=False, sep='\t')

