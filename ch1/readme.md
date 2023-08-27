# calculate_trip_price function

#### Description:
This function calculates the trip estimated price given the user's pick up and drop off GPS coordinates as well as different parameters, inclusive of commission, premiums and discounts. 

#### Language:
Python

##### Usage:
```total_price = calculate_trip_price(base_charge, charge_per_km, charge_per_minute, pickup_coord, dropoff_coord, geo_area_premium, min_fare, promo_code_discount, medium_distance_premium, long_distance_premium, morning_rush_premium, evening_rush_premium, commission, blanket_discount)```

##### Parameters:
- `base_charge`: base charge
- `charge_per_km`: charge per km for distance covered
- `charge_per_minute`: charge per minute of the trip duration
- `pickup_coord`: user's starting point GPS coordinates
- `dropoff_coord`: user's destination GPS coordinates
- `geo_area_premium`: premium percent value for particular places
- `min_fare`: minimum trip value
- `promo_code_discount`: promocode discount percent value
- `medium_distance_premium`: premium percent value for trips whose distance ranges from 10 - 30 km
- `long_distance_premium`: premium percent value for trips whose distance is above 30km
- `morning_rush_premium`: premium percent value for morning rush hour between 07:00AM - 08:00AM
- `evening_rush_premium`: premium percent value for evening rush hour between 05:00PM - 08:00PM
- `commission`: premium percent value for company commission, 
- `blanket_discount`: discount percent value for blanket discount applied

#### Return Value
The function returns a final computed value of the trip estimated price. It also prints a breakdown of the pricing to include the base fare, minimum fare, time fare, distance fare, premium fare, and discount fare.  For example:

```
{
    'base fare': 10500, 
    'minimum fare': 10000, 
    'time': 2500, 
    'distance': 5000, 
    'premium': 0, 
    'discounts': 0, 
    'final_price': 18000
}
```

#### How it Works:
This function: 
- computes the distance covered from the pickup and dropoff coordinates parameter values provided using the haversine_distance function.
- calculates the base fare using this formula `base_charge + duration_charge + distance_charge`
- computes the different premiums and discounts from the base fare. For example, to compute commission is `base fare * commission/100`
- sums up the premium values and discount values before applying them to the base fare to get the overall total price: `base fare + premium_value - discount_value`
- rounds up the overall total price to the nearest 500
    - if the overall total price is less than 0, then it becomes 0.
- if the `overall total price is less than the minimum fare but there is a promo discount`, then the function returns the `overall total price`. 
- if the `overall total price is less than the minimum fare but there is no promo discount`, then the function returns the `minimum fare`. 
- if the `overall total price is greater than the minimum fare`, then the function returns the `overall total price`. 

### How to use it

Update the parameters in the calculate_trip.py

```
# Example charges and coordinates
base_charge = 5000
charge_per_km = 1000
charge_per_minute = 250
min_fare = 10000
geo_area_premium = 0
promo_code_discount = 90
medium_distance_premium = 70
long_distance_premium = 0
morning_rush_premium = 0
evening_rush_premium = 0
commission = 10
blanket_discount = 0


pickup_coord = (0.374242, 32.523813)  # Arena mall
dropoff_coord = (0.294242, 32.523813)  # Najjera police

```