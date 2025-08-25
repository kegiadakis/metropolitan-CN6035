-- Clear existing data (respect foreign key order)
DELETE FROM reservations;
DELETE FROM movies;
DELETE FROM cinemas;
DELETE FROM users;

-- Users
INSERT INTO users (user_id, email, password, name)
SELECT 1, 'admin@example.com', 'hashedpass1', 'Admin User'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE user_id = 1
);

INSERT INTO users (user_id, email, password, name)
SELECT 2, 'user@example.com', 'hashedpass2', 'Simple User'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE user_id = 2
);

-- Cinemas
INSERT INTO cinemas (cinema_id, name, location, description)
SELECT 1, 'Cinema One', 'Athens', 'Main cinema'
WHERE NOT EXISTS (SELECT 1 FROM cinemas WHERE cinema_id = 1);

INSERT INTO cinemas (cinema_id, name, location, description)
SELECT 2, 'Cinema Two', 'Thessaloniki', 'Popular cinema'
WHERE NOT EXISTS (SELECT 1 FROM cinemas WHERE cinema_id = 2);

-- Movies (each assigned to a cinema)
INSERT INTO movies (movie_id, title, duration, rating, cinema_id)
SELECT 1, 'Oppenheimer', 180, 'PG-13', 1
WHERE NOT EXISTS (SELECT 1 FROM movies WHERE movie_id = 1);

INSERT INTO movies (movie_id, title, duration, rating, cinema_id)
SELECT 2, 'Barbie', 120, 'PG', 1
WHERE NOT EXISTS (SELECT 1 FROM movies WHERE movie_id = 2);

INSERT INTO movies (movie_id, title, duration, rating, cinema_id)
SELECT 3, 'Tenet', 150, 'PG-13', 2
WHERE NOT EXISTS (SELECT 1 FROM movies WHERE movie_id = 3);

INSERT INTO movies (movie_id, title, duration, rating, cinema_id)
SELECT 4, 'F1', 180, 'PG-13', 2
WHERE NOT EXISTS (SELECT 1 FROM movies WHERE movie_id = 4);

-- Reservations
INSERT INTO reservations (date, time, seat_numbers, user_id, movie_id, cinema_id)
VALUES
  ('2025-08-20', '19:30', 'A1,A2', 2, 1, 1),
  ('2025-08-22', '21:00', 'B4', 2, 2, 1),
  ('2025-08-25', '18:00', 'C3,C4', 2, 3, 2),
  ('2025-08-28', '20:00', 'D10,D11', 2, 4, 2);