import math
import datetime


def haversine_distance(lat1, lon1, lat2, lon2):
    # Haversine formula to calculate distance between two GPS coordinates
    # (lat1, lon1): First coordinate
    # (lat2, lon2): Second coordinate
    # Returns distance in kilometers

    # Radius of the Earth in kilometers
    R = 6371.0

    # Convert degrees to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Differences in coordinates
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    # Haversine formula calculation
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c

    return distance


def calculate_trip_price(
    base_charge,
    charge_per_km,
    charge_per_minute,
    pickup_coord,
    dropoff_coord,
    geo_area_premium,
    min_fare,
    promo_code_discount,
    medium_distance_premium,
    long_distance_premium,
    morning_rush_premium,
    evening_rush_premium,
    commission,
    blanket_discount,
):
    # Calculate the distance between pickup and dropoff coordinates
    kololo_coordinates = (0.3273, 32.5949)
    geo_area_coordinates = [
        kololo_coordinates,
    ]

    distance = haversine_distance(
        pickup_coord[0], pickup_coord[1], dropoff_coord[0], dropoff_coord[1]
    )
    print("+++ distance", distance)

    # Calculate the duration charge (in minutes, assuming the duration is provided)
    duration_minutes = 10  # Example duration in minutes
    duration_charge = duration_minutes * charge_per_minute

    # Calculate the distance charge
    distance_charge = distance * charge_per_km

    # Calculate the total price
    total_price = base_charge + duration_charge + distance_charge

    premium_value = 0
    discount_value = 0
    final_price = 0

    # Add SafeBoda commission
    premium_value += total_price * commission / 100

    # Add rush hour premium: 17:00 - 20:00 and 07:00 - 08:00
    current_time = datetime.datetime.now().time()
    # morning rush
    if current_time >= datetime.time(7, 0) and current_time <= datetime.time(8, 0):
        premium_value += total_price * morning_rush_premium / 100
    # evening rush
    if current_time >= datetime.time(17, 0) and current_time <= datetime.time(20, 0):
        premium_value += total_price * evening_rush_premium / 100

    # Add geo_area_premium
    if pickup_coord in geo_area_coordinates:
        premium_value += total_price * geo_area_premium / 100

    # Calculate and add distance premium: 10 - 30km and 30+ km; 0% for bikes for both, 10%, 25% for cars
    if distance >= 10 and distance <= 30:
        premium_value += total_price * medium_distance_premium / 100
    if distance > 30:
        premium_value += total_price * long_distance_premium / 100

    if promo_code_discount:
        discount_value += total_price * (promo_code_discount / 100)

    if blanket_discount:
        discount_value += total_price * (blanket_discount / 100)

    total_price = total_price + premium_value - discount_value
    # # Round off the total price to the nearest 500
    rounded_price = math.ceil(total_price / 500) * 500

    rounded_price = rounded_price if rounded_price > 0 else 0

    # final price can be less than min_fare if promo code discount is used
    if (rounded_price < min_fare) and promo_code_discount > 0:
        final_price = rounded_price
    if (rounded_price < min_fare) and promo_code_discount <= 0:
        # show discount up to min fare if blanket discount fell below min fare
        discount_value = min_fare - rounded_price
        final_price = min_fare
    if rounded_price > min_fare:
        final_price = rounded_price

    print(
        {
            "base fare": base_charge + duration_charge + distance_charge,
            "minimum fare": min_fare,
            "duration+charge": duration_charge,
            "distance+charge": distance_charge,
            "premium": premium_value,
            "discounts": discount_value,
            "final_price": final_price,
        }
    )

    return final_price


# Example charges and coordinates
base_charge = 5000
charge_per_km = 1000
charge_per_minute = 250
min_fare = 10000
geo_area_premium = 0
promo_code_discount = 10
medium_distance_premium = 70
long_distance_premium = 0
morning_rush_premium = 10
evening_rush_premium = 25
commission = 10
blanket_discount = 0


pickup_coord = (0.374242, 32.523813)  # Arena mall
dropoff_coord = (0.294242, 32.523813)  # Najjera police

total_price = calculate_trip_price(
    base_charge,
    charge_per_km,
    charge_per_minute,
    pickup_coord,
    dropoff_coord,
    geo_area_premium,
    min_fare,
    promo_code_discount,
    medium_distance_premium,
    long_distance_premium,
    morning_rush_premium,
    evening_rush_premium,
    commission,
    blanket_discount,
)

print(f"Total Price: {total_price:.2f}")
