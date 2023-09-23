from scipy.stats import yeojohnson
import numpy as np
import warnings

warnings.simplefilter(action='ignore', category=FutureWarning)


# Reduce outliers by replacing them with the median value of the neighbors
def replace_outliers(data_frame, outliers, column):
    for outlier in outliers:
        neighbors = data_frame[column].iloc[max(outlier - 1, 0):min(outlier + 2, len(data_frame))]
        median_value = neighbors.median()
        data_frame.loc[outlier, column] = median_value


# Apply the IQR dispersion and Yeo-Johnson transformation
def normalize_data_frame(data_frame):
    # Calculate the IQR
    quartile1 = data_frame['T'].quantile(0.25)
    quartile3 = data_frame['T'].quantile(0.75)
    interquartile_range = quartile3 - quartile1

    # Identify outliers
    outliers = data_frame[np.logical_or(data_frame['T'] < quartile1 - 1.5 * interquartile_range, data_frame['T'] >
                                        quartile3 + 1.5 * interquartile_range)]
    replace_outliers(data_frame, outliers.index, 'T')
    df_yeoj = data_frame.copy()

    # Yeo-Johnson transformation
    df_yeoj_vals, fitted_lambda_yeoj = yeojohnson(df_yeoj['T'])
    df_yeoj['T_yeoj'] = df_yeoj_vals

    # Created a new DataFrame to use
    resulted_data_frame = df_yeoj[['datetime', 'T_yeoj']].copy()

    # Rename column
    resulted_data_frame.rename(columns={'T_yeoj': 'T'}, inplace=True)
    return resulted_data_frame
