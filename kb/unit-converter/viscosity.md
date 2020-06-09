
Equivelancy:
1 Centipoise == 1 mPa.s
1 Centistoke == 1 cm2/s

Units       [Unit x [] to PRIME]
D
-----
Centipoise  [PRIME]
mPa•s       [1]
Poise       [100]
d•s/cm2     [100]

K
-----
Centistoke  [PRIME]
Stoke       [100]
cm2/s       [100]
Saybolt Seconds Unversal (100 F)    for cSt<500     [1/4.632]
Saybolt Seconds Unversal (210 F)    for cSt<120     [1/4.664]


If src == D and dest == D:
    Convert src to Centipoise
    Convert Centipose to dest
Else if src == D and dest == K:
    Display SG
    Convert src to Centipoise
    Convert Centipose to Centistoke using SG
    Convert Centistoke to dest
Else if src == K and dest == K:
    Convert src to Centistoke
    Convert Centistoke to dest
Else if src == K and dest == D
    Display SG
    Convert src to Centistoke
    Convert Centistoke to Centipoise
    Convert Centipose to dest

If Destination has cSt_cuttoff, calculate the cSt, 
and display warning if the cSt value is over the threshold.