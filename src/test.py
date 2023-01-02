x = 5
y = 6
z = 7
p = 4
u = 4
j = 4

type = "scalene"

if(x == y or x == z or y == z):
    type = "isosceles"
    if(p == u and u == j):
        type = "equilateral"
        
print(type)
