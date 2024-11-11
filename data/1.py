import pandas as pd
import pygwalker as pyg


df = pd.read_csv('1.CSV', encoding='gbk')

pyg.show(df)
