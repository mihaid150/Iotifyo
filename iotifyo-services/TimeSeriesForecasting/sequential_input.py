import numpy as np


def sequential_input_lstm(data_frame, input_sequence):
    df_np = data_frame.to_numpy()
    x = []
    y = []

    for i in range(len(df_np) - input_sequence):
        row = [a for a in df_np[i:i + input_sequence]]
        x.append(row)
        label = df_np[i + input_sequence]
        y.append(label)

    return np.array(x), np.array(y)
