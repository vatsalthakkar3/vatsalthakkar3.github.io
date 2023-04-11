# Python Notes

Class: Before Coding Interview
Created: March 16, 2023 1:19 PM
Date: April 10, 2023
Reviewed: No

### **Floor and round():-**

```python
print(31//4) # 7
print(17.78797//1) # 17.0
print(round(17.809797433683,4)) # 17.8098
17 == 17.0 # True
```

### **type() and isinstance():-**

**type()** : You can check what type of object is assigned to a variable

```python
a = (1,2)  # type(a) => <class 'tuple'>
b = "Vatsal" # type(b) => <class 'str'>
c = {1,2,3,4,4} # type(c) => <class 'set'>
d = {'a' : "Fruit", 'b' : "Fruit2"} # type(d) => <class 'dict'>
e = True # type(e) => <class 'bool'>
f = [1,2,3,4,4] # type(f) => <class 'list'>
g = 9.8 # type(g) => <class 'float'>
h=5 # type(h) => <class 'int'>

isinstance(e,bool) # True

```

### Some Built-in Functions:

| Function | Description | Example |
| --- | --- | --- |
| abs() | Return the absolute value of a number
Return the absolute value of a complex number | abs(-7.25) ⇒ 7.25
abs(3+5j) ⇒ 5.83095 |
|  |  |  |