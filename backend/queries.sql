
CREATE TABLE category (
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
title TEXT NOT NULL
); 

CREATE TABLE ad (
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
title TEXT NOT NULL,
description TEXT, 
owner TEXT,
price INTEGER,
picture TEXT,
location TEXT,
category_id INTEGER,
createdAt TEXT,
FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (title) VALUES ('Vêtement'), ('Voiture'), ('Autre');

SELECT title FROM ad WHERE id = 100;

SELECT * FROM ad WHERE location = 'Bordeaux';

DELETE  FROM ad WHERE id = 38;


UPDATE ad SET price = 0 WHERE createdAt LIKE '2023-09-01%';

SELECT location, AVG(price) FROM ad GROUP BY location;

SELECT * FROM ad a INNER JOIN category c on c.id = a.category_id WHERE c.title = 'Vêtement' ;

SELECT * FROM ad a INNER JOIN category c on c.id = a.category_id WHERE c.title = 'Vêtement' OR c.title = 'Voiture';

SELECT AVG(a.price), c.title FROM ad a INNER JOIN category c on c.id = a.category_id WHERE c.title = 'Autre';

SELECT * FROM ad a INNER JOIN category c on c.id = a.category_id WHERE c.title LIKE 'V%';


INSERT INTO `ad` (`title`, `description`, `owner`, `price`, `picture`, `location`, `categoryId`, `createdAt`)
VALUES
    ('Winter Jacket', 'Brand new winter jacket, size M. Warm and comfortable for cold weather.', 'clothes.seller@gmail.com', 50, 'https://cdn.pixabay.com/photo/2016/03/26/23/04/jacket-1284360_1280.jpg', 'Lyon', 1, '2023-12-01T11:10:25.633Z'),
    ('Used Sedan', 'Well-maintained sedan with low mileage. Perfect for city commuting.', 'car.owner@gmail.com', 8500, 'https://cdn.pixabay.com/photo/2016/03/09/09/28/auto-1245712_1280.jpg', 'Paris', 2, '2023-07-18T13:22:33.512Z'),
    ('Dining Table', 'Wooden dining table with 6 chairs. Some wear but still in good condition.', 'furniture.seller@gmail.com', 200, 'https://cdn.pixabay.com/photo/2016/07/15/20/07/dining-table-1517161_1280.jpg', 'Bordeaux', 3, '2023-10-11T09:45:38.789Z'),
    ('Sports Car', 'High-performance sports car, only 10,000km. Fast and reliable.', 'luxury.car.seller@gmail.com', 55000, 'https://cdn.pixabay.com/photo/2017/08/30/23/05/car-2698519_1280.jpg', 'Paris', 2, '2023-09-20T14:10:22.654Z'),
    ('Leather Boots', 'Genuine leather boots, size 42. Perfect for winter.', 'shoes.seller@gmail.com', 120, 'https://cdn.pixabay.com/photo/2015/03/12/08/58/shoes-669117_1280.jpg', 'Lyon', 1, '2023-11-02T07:31:17.310Z'),
    ('Mountain Bike', 'Durable mountain bike with suspension. Ideal for rough terrain.', 'bike.enthusiast@gmail.com', 350, 'https://cdn.pixabay.com/photo/2016/07/29/16/11/bike-1558411_1280.jpg', 'Bordeaux', 3, '2023-08-29T12:22:33.987Z'),
    ('Jeans', 'High-quality denim jeans, size L. Brand new.', 'jeans.seller@gmail.com', 45, 'https://cdn.pixabay.com/photo/2016/03/27/21/34/jeans-1284367_1280.jpg', 'Lyon', 1, '2023-11-05T14:22:33.511Z'),
    ('SUV', 'Spacious SUV, perfect for family trips. Good condition.', 'familycar.owner@gmail.com', 18000, 'https://cdn.pixabay.com/photo/2016/11/21/12/46/auto-1848872_1280.jpg', 'Paris', 2, '2023-07-12T13:17:29.877Z'),
    ('Office Chair', 'Ergonomic office chair, comfortable for long hours.', 'chair.seller@gmail.com', 95, 'https://cdn.pixabay.com/photo/2015/01/29/15/48/office-chair-616281_1280.jpg', 'Bordeaux', 3, '2023-09-18T16:22:14.623Z'),
    ('Convertible', 'Stylish convertible, ideal for summer drives.', 'convertible.seller@gmail.com', 27000, 'https://cdn.pixabay.com/photo/2015/05/31/10/55/convertible-792589_1280.jpg', 'Paris', 2, '2023-08-14T09:11:47.398Z'),
    ('Sneakers', 'Comfortable and stylish sneakers, size 41.', 'sneakers.seller@gmail.com', 65, 'https://cdn.pixabay.com/photo/2017/02/14/12/46/feet-2065706_1280.jpg', 'Bordeaux', 1, '2023-10-25T08:24:13.211Z'),
    ('Electric Bike', 'Eco-friendly electric bike, great condition.', 'electric.bike.seller@gmail.com', 800, 'https://cdn.pixabay.com/photo/2017/08/30/12/45/electric-bike-2693820_1280.jpg', 'Lyon', 3, '2023-06-30T12:45:12.567Z'),
    ('Raincoat', 'Waterproof raincoat, size XL, perfect for rainy days.', 'clothing.seller@gmail.com', 35, 'https://cdn.pixabay.com/photo/2017/06/07/09/24/fashion-2385925_1280.jpg', 'Paris', 1, '2023-11-18T11:22:33.511Z'),
    ('Motorbike', 'Sporty motorbike with low mileage, ready for adventures.', 'bike.owner@gmail.com', 5200, 'https://cdn.pixabay.com/photo/2016/07/29/11/36/motorbike-1557567_1280.jpg', 'Paris', 2, '2023-09-22T17:45:33.214Z'),
    ('Couch', 'Comfortable 3-seater couch in good condition.', 'furniture.owner@gmail.com', 250, 'https://cdn.pixabay.com/photo/2016/11/29/10/07/couch-1866416_1280.jpg', 'Bordeaux', 3, '2023-10-12T10:15:11.456Z'),
    ('Trench Coat', 'Classic trench coat, size M. Perfect for autumn.', 'coat.seller@gmail.com', 85, 'https://cdn.pixabay.com/photo/2016/07/15/14/47/fashion-1513893_1280.jpg', 'Lyon', 1, '2023-11-25T08:34:22.512Z'),
    ('Classic Car', 'Vintage classic car, fully restored. Great for collectors.', 'classiccar.seller@gmail.com', 32000, 'https://cdn.pixabay.com/photo/2016/10/16/21/55/car-1747125_1280.jpg', 'Paris', 2, '2023-09-30T15:22:33.978Z'),
    ('Bookshelf', 'Solid wood bookshelf, with 5 shelves.', 'furniture.seller@gmail.com', 120, 'https://cdn.pixabay.com/photo/2015/09/05/20/02/bookcase-924058_1280.jpg', 'Bordeaux', 3, '2023-08-20T10:45:12.633Z'),
    ('Running Shoes', 'Lightweight running shoes, size 43.', 'shoes.owner@gmail.com', 55, 'https://cdn.pixabay.com/photo/2017/01/24/02/30/feet-2003614_1280.jpg', 'Lyon', 1, '2023-11-01T14:22:33.411Z'),
    ('Campervan', 'Fully equipped campervan, perfect for road trips.', 'campervan.seller@gmail.com', 46000, 'https://cdn.pixabay.com/photo/2016/08/05/14/47/caravan-1570078_1280.jpg', 'Paris', 2, '2023-06-20T13:15:12.987Z'),
    ('Wardrobe', 'Spacious wardrobe with sliding doors.', 'wardrobe.seller@gmail.com', 400, 'https://cdn.pixabay.com/photo/2015/12/07/11/35/closet-1078931_1280.jpg', 'Lyon', 3, '2023-09-18T11:10:55.411Z'),
    ('Leather Jacket', 'Genuine leather jacket, size L. Perfect for bikers.', 'leather.seller@gmail.com', 180, 'https://cdn.pixabay.com/photo/2016/07/15/18/40/leather-jacket-1518706_1280.jpg', 'Bordeaux', 1, '2023-12-01T11:05:33.788Z'),
    ('Convertible Sofa', 'Convertible sofa with storage space, in good condition.', 'sofa.seller@gmail.com', 320, 'https://cdn.pixabay.com/photo/2016/11/29/10/07/sofa-1866415_1280.jpg', 'Paris', 3, '2023-08-10T10:15:22.633Z'),
    ('High Heels', 'Elegant high heels, size 38, perfect for parties.', 'fashion.seller@gmail.com', 70, 'https://cdn.pixabay.com/photo/2017/06/07/16/42/fashion-2388883_1280.jpg', 'Bordeaux', 1, '2023-09-05T11:22:15.412Z'),
    ('Pickup Truck', 'Reliable pickup truck, great for heavy-duty tasks.', 'truck.seller@gmail.com', 24000, 'https://cdn.pixabay.com/photo/2015/03/26/10/09/pickup-690009_1280.jpg', 'Paris', 2, '2023-08-25T13:17:55.410Z'),
    ('Bookshelf', 'Large wooden bookshelf, perfect for home libraries.', 'library.seller@gmail.com', 150, 'https://cdn.pixabay.com/photo/2016/12/14/23/08/bookcase-1905891_1280.jpg', 'Lyon', 3, '2023-09-30T09:10:55.211Z'),
    ('Winter Coat', 'Thick winter coat, size XL. Keeps you warm during snow.', 'coat.seller@gmail.com', 120, 'https://cdn.pixabay.com/photo/2016/11/22/20/10/cold-1853935_1280.jpg', 'Paris', 1, '2023-11-01T14:22:33.778Z'),
    ('Luxury Car', 'Premium luxury car with all features, like new.', 'luxurycar.owner@gmail.com', 82000, 'https://cdn.pixabay.com/photo/2016/12/13/19/50/car-1906934_1280.jpg', 'Paris', 2, '2023-08-11T13:17:12.899Z'),
    ('Electric Scooter', 'Modern electric scooter, foldable and efficient.', 'scooter.seller@gmail.com', 490, 'https://cdn.pixabay.com/photo/2018/10/25/12/46/scooter-3778288_1280.jpg', 'Bordeaux', 3, '2023-09-14T10:45:12.633Z'),
    ('Running Shorts', 'Breathable running shorts, size M, perfect for summer.', 'sports.seller@gmail.com', 30, 'https://cdn.pixabay.com/photo/2015/07/02/10/39/running-828314_1280.jpg', 'Paris', 1, '2023-11-12T07:31:17.221Z'),
    ('Convertible', 'Stylish convertible, ideal for summer drives.', 'convertible.seller@gmail.com', 27000, 'https://cdn.pixabay.com/photo/2015/05/31/10/55/convertible-792589_1280.jpg', 'Paris', 2, '2023-08-14T09:11:47.398Z'),
    ('Bookshelf', 'Solid wood bookshelf, with 5 shelves.', 'furniture.seller@gmail.com', 120, 'https://cdn.pixabay.com/photo/2015/09/05/20/02/bookcase-924058_1280.jpg', 'Paris', 3, '2023-08-20T10:45:12.633Z'),
    ('Running Shoes', 'Lightweight running shoes, size 43.', 'shoes.owner@gmail.com', 55, 'https://cdn.pixabay.com/photo/2017/01/24/02/30/feet-2003614_1280.jpg', 'Bordeaux', 1, '2023-11-01T14:22:33.411Z'),
    ('Campervan', 'Fully equipped campervan, perfect for road trips.', 'campervan.seller@gmail.com', 46000, 'https://cdn.pixabay.com/photo/2016/08/05/14/47/caravan-1570078_1280.jpg', 'Lyon', 2, '2023-06-20T13:15:12.987Z'),
    ('Wardrobe', 'Spacious wardrobe with sliding doors.', 'wardrobe.seller@gmail.com', 400, 'https://cdn.pixabay.com/photo/2015/12/07/11/35/closet-1078931_1280.jpg', 'Lyon', 3, '2023-09-18T11:10:55.411Z'),
    ('Leather Jacket', 'Genuine leather jacket, size L. Perfect for bikers.', 'leather.seller@gmail.com', 180, 'https://cdn.pixabay.com/photo/2016/07/15/18/40/leather-jacket-1518706_1280.jpg', 'Bordeaux', 1, '2023-12-01T11:05:33.788Z'),
    ('Convertible Sofa', 'Convertible sofa with storage space, in good condition.', 'sofa.seller@gmail.com', 320, 'https://cdn.pixabay.com/photo/2016/11/29/10/07/sofa-1866415_1280.jpg', 'Paris', 3, '2023-08-10T10:15:22.633Z');
