-----
title:   Latex Quickstart
date:  June 6th, 2019
-----


# LaTex Quick start

All LaTex equations must be open and closed with `$$` characters.

LaTex is a *typesetting* language.  Plain text *is* LaTex.  The following:

```
$$ x = y + z $$
```

... renders like this:

=+=
$$x = y + z $$
=+=

The equations are automatically centered on the HTML page - however this is something we can change later if there is a need.

## Fractions and grouping
Fractions are written using the `\over` command:

```
$$ x = y \over z $$
```
=+=
$$x = y \over z $$
=+=

**Notice that the "over" part won't necessarily group things the way you want**.  The `{` and `}` braces allow you to define groups of text.  

```
$$ x = { y \over z}$$
```

=+=
$$ x = { y \over z}$$
=+=

With the `{` and `}` in place, the `\over` command now works as expected - forming a fraction with only `y` and `z`.

Combinations of the grouping and `\over` command lets you define much more complex expressions:

```
$$ x = {{y \over z} + 6 \over {y +9}}$$
```

=+=
$$ x = {{y \over z} + 6 \over {y +9}}$$
=+=

Notice how the `\over` between 6 and `{y+9}` puts a bar between everything to the left, within the group, and everyhing to the right.

## Subscripts and Exponents
Subscripts are supported using `_` and supercripts / exponents use `^`.

```
$$ x_c = y^7 $$
```
=+=
$$ x_c = y^7 $$
=+=

Again, the grouping operator can allow you to create complex subscripts and exponents.

```
$$ x_{c+9} = y^{{x+6} \over 7} $$
```

=+=
```
$$ x_{c+9} = y^{{x+6} \over 7} $$
```
=+=

## Mathematical Operators
Addition and subtraction use `+` and `-` as would be expected.  For multiplication, you may omit the operator entirely.

```
$$ x_c = y^7z + 8x $$
```

=+=
$$ x_c = y^7z + 8x $$
=+=

Division will typically be noted using the `\over` command as shown above, but if you want to use a division sign, you may do so with the `\div` command.

```
$$ x = 15 \div 2 $$
```

=+=
$$ x = 15 \div 2 $$
=+=

**Note the pattern**, like `\over`, the `\` is used to designate a special operation/symbol.  There are many supported - here are a few that are quite common.

```
\alpha
\beta
\gamma
\delta
\eta
\theta
\lambda
\omega
\parallel
\times
\bigtriangleup
\cdot
\measuredangle
\Longrightarrow
\infty
\sin
\cos
\log
```

=+=
$$ 
\alpha 
\beta 
\gamma 
\delta 
\eta 
\theta 
\lambda 
\omega 
\parallel 
\times 
\bigtriangleup 
\cdot 
\measuredangle 
\Longrightarrow 
\infty 
\sin 
\cos 
\log 
$$
=+=

There is a complete list of mathematical notation symbols found [here](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols#Unary_operators)

## Math functions
For things like square roots and logorithms, you must remember to use the grouping operator `{ }` to ensure the right parts of the equation are included in the layout.

For example:

```
$$ \sqrt 9 + x $$
```
=+=
$$ \sqrt 9 + x $$
=+=

If you wanted to compute the square root of 9+x instead, you'd write it as such
```
$$ \sqrt {x + 9} $$
```
=+= 
$$ \sqrt {x + 9} $$
=+= 

## Complex example
Below is the friction factor equation, which is fairly representative of what the above commands can accomplish.

```
$$ {1 \over \sqrt f} = -2 \log({\epsilon \over 2.7D_h} + {2.51 \over Re \sqrt f}) $$
```

=+=
<span class='equation-label'>Eq. 1</span>
$$ {1 \over \sqrt f} = -2 \log({\epsilon \over 2.7D_h} + {2.51 \over Re \sqrt f}) $$
=+=

## Numbered Equations
Often within text content you will want to embed references to equations.  You may apply labels (i.e. Eq. 2.1) to equations by embedding using `#` in the first line within the equation block:

=+= 

$$ \sqrt {x + 9} $$
=+= 