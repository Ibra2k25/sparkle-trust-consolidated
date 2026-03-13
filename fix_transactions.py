import re

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# List of all debit transaction titles to replace with "Withdrawal"
debit_titles = [
    "Restaurant Dinner", "Online Shopping", "Gym Membership", "Christmas Shopping",
    "Home Repairs", "Medical Expenses", "Vacation Expenses", "Furniture Purchase",
    "Internet & Cable", "Gas & Fuel", "Phone Bill", "Streaming Services",
    "Clothing Shopping", "Pet Care", "Coffee Shop", "Car Maintenance",
    "Birthday Gift", "Pharmacy", "Dining Out", "Bookstore", "Holiday Travel",
    "Electronics Purchase", "Fitness Equipment", "Concert Tickets", "Home Insurance",
    "Garden Supplies", "Spa & Wellness", "Pet Grooming", "Subscription Services",
    "Parking Fees", "Dry Cleaning", "Office Supplies", "Holiday Party",
    "Charity Donation", "Movie Tickets", "School Supplies", "Water Bill",
    "Haircut & Salon", "Sports Equipment", "Taxi & Rideshare", "Art Supplies",
    "Music Lessons", "Flowers & Plants", "Laundry Service", "Gift Cards",
    "Sporting Event", "Home Decor", "Bike Repair", "Kitchen Appliances",
    "Museum Membership", "Photography Services", "Gardening Service",
    "Wine & Spirits", "Jewelry Repair", "Bakery & Pastries", "Yoga Classes",
    "Holiday Decorations", "Tailoring Services"
]

# Replace all debit titles with "Withdrawal"
for title in debit_titles:
    content = content.replace(f'title:"{title}"', 'title:"Withdrawal"')

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully replaced all transaction titles!")
