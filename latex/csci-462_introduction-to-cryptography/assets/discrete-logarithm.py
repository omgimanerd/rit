#!/usr/bin/env python3

def discrete_logarithm(result, base, mod):
  i = 1
  seen = []
  accum = base
  while True:
    t = accum % mod
    if t in seen:
      return "No discrete logarithm!"
    if t == result:
      return i
    seen.append(t)
    accum = (accum * base) % mod
    i += 1

if __name__ == '__main__':
  print(discrete_logarithm(2, 3, 11))
  print(discrete_logarithm(3, 2, 19))
  print(discrete_logarithm(3, 3, 97))
  print(discrete_logarithm(3, 4, 97))
  print(discrete_logarithm(4, 3, 97))
  print(discrete_logarithm(43, 3, 97))
