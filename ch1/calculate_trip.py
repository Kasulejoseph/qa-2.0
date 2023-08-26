import math

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
        a = math.sin(dlat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance = R * c
        
        return distance

def calculate_trip_price(base_charge, charge_per_km, charge_per_minute, pickup_coord, dropoff_coord, min_fare, promo_code_discount):
    # Calculate the distance between pickup and dropoff coordinates

    distance = haversine_distance(pickup_coord[0], pickup_coord[1], dropoff_coord[0], dropoff_coord[1])
    print("+++ distance", distance)
    
    # Calculate the duration charge (in minutes, assuming the duration is provided)
    duration_minutes = 10  # Example duration in minutes
    duration_charge = duration_minutes * charge_per_minute
    
    # Calculate the distance charge
    distance_charge = distance * charge_per_km
    
    # Calculate the total price
    total_price = base_charge + duration_charge + distance_charge
    
    if promo_code_discount:
        tota_discount = total_price*(promo_code_discount/100)
        total_price = total_price - tota_discount 
        
    
    # Round off the total price to the nearest 500
    rounded_price = round(total_price / 500) * 500
    
    if rounded_price < min_fare:
        return min_fare
    
    return rounded_price

# Example charges and coordinates
base_charge = 5000
charge_per_km = 1000
charge_per_minute = 250
min_fare = 10000
promo_code_discount = 20
pickup_coord = (0.307354, 32.584065)  # Arena mall
dropoff_coord = (0.381255, 32.629299)  # Najjera police

total_price = calculate_trip_price(base_charge, charge_per_km, charge_per_minute, pickup_coord, dropoff_coord, min_fare, promo_code_discount)

# consider promo  code
# distance premium
# blanket discount
# create a trip summary
print(f"Total Price: {total_price:.2f}")

