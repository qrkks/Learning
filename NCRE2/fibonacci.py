# def phib(i):
#     if i == 0:
#         return 0
#     elif i == 1:
#         return 1
#     else:
#         return phib(i-2) + phib(i-1)

# # 打印 Fibonacci 数列，使用逗号分隔
# for i in range(1, 10):
#     if i != 9:
#         print(phib(i), end=', ')
#     else:
#         print(phib(i))  # 最后一个元素不加逗号

a, b = 0, 1
while a <= 100:
    print(a, end=',')
    a, b = b, a + b
