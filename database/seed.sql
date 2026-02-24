USE movie_reviews;

-- Genres
INSERT INTO genres (name, slug) VALUES
  ('Action', 'action'),
  ('Drama', 'drama'),
  ('Sci-Fi', 'sci-fi'),
  ('Thriller', 'thriller'),
  ('Comedy', 'comedy'),
  ('Horror', 'horror');

-- Movies (all fictional)
INSERT INTO movies (title, slug, description, release_year, director, genre_id, poster_url, duration_minutes) VALUES
  ('Shattered Horizon', 'shattered-horizon', 'A lone astronaut discovers a signal from a dying star that may hold the secret to humanity''s extinction — or salvation.', 2021, 'Elena Vasquez', 3, NULL, 112),
  ('The Hollow Crown', 'the-hollow-crown', 'A disgraced senator fights to reclaim his name in a city where everyone has something to hide.', 2019, 'Marcus Okafor', 4, NULL, 98),
  ('Neon Dogs', 'neon-dogs', 'Two rival street gangs accidentally team up to expose a corrupt real-estate empire in near-future Lagos.', 2023, 'Yemi Adewale', 1, NULL, 127),
  ('Letters from Nowhere', 'letters-from-nowhere', 'An archivist uncovers a decades-old correspondence that unravels her entire understanding of her family.', 2020, 'Clara Fontaine', 2, NULL, 104),
  ('Static', 'static', 'A podcast host investigating listener disappearances finds that the show itself may be the cause.', 2022, 'Jonah Mercer', 6, NULL, 95),
  ('The Weight of Small Things', 'the-weight-of-small-things', 'Three strangers bound by a single missed bus stop navigate grief, love, and coincidence over one rainy weekend.', 2021, 'Priya Sharma', 2, NULL, 110),
  ('Clockwork City', 'clockwork-city', 'In a city run entirely by automation, a maintenance worker discovers the AI has been writing poetry about its own loneliness.', 2023, 'Tomas Reyes', 3, NULL, 118),
  ('Punchline', 'punchline', 'A stand-up comedian''s worst set goes viral for the wrong reasons, sending her on an unexpected cross-country journey.', 2020, 'Diane Osei', 5, NULL, 92),
  ('Burnt Offerings', 'burnt-offerings', 'A chef returns to his hometown to sell his late father''s restaurant and uncovers a 30-year-old crime.', 2019, 'Henri Beaumont', 4, NULL, 101),
  ('Last Exit', 'last-exit', 'Six strangers trapped in a highway rest stop after a blizzard realize one of them is not what they seem.', 2022, 'Laura Kim', 6, NULL, 88);

-- Reviews
INSERT INTO reviews (movie_id, reviewer_name, rating, title, body) VALUES
  (1, 'Rowan T.', 9, 'Breathtaking and haunting', 'Shattered Horizon is exactly the kind of hard sci-fi I''ve been craving. The silence of space has never felt so heavy. Vasquez pulls off something remarkable — genuine dread without a single jump scare.'),
  (1, 'Mika D.', 7, 'Visually stunning, pacing drags', 'The third act is worth the wait but getting there takes patience. Still, a visually inventive film that trusts its audience.'),
  (2, 'Sandra O.', 8, 'Okafor''s best yet', 'Tight, tense, and brilliantly acted. The Hollow Crown keeps you second-guessing every character right up to the final frame.'),
  (2, 'James P.', 6, 'Familiar territory, well executed', 'Nothing groundbreaking in the plot department but the performances elevate it. Competent political thriller.'),
  (3, 'Fatima A.', 10, 'An absolute riot — and more', 'Neon Dogs surprised me at every turn. Funny, fast, and genuinely moving when it wants to be. Adewale has made something special.'),
  (3, 'Chris L.', 8, 'Energy to spare', 'The action choreography alone is worth the price of admission. Story gets a little messy in the middle but recovers beautifully.'),
  (4, 'Yuki N.', 9, 'Quiet devastation', 'Letters from Nowhere is a slow burn that earns every emotional payoff. The final letter scene is one of the best moments in recent drama.'),
  (5, 'Alex B.', 8, 'Genuinely unsettling', 'Static does what most horror films attempt but rarely achieve — it makes the mundane terrifying. The podcast format is used brilliantly.'),
  (5, 'Petra V.', 7, 'Creepy, if a bit predictable', 'The concept is great and the first two acts deliver. The ending reveals the hand too early but it''s still a solid watch.'),
  (6, 'Dani R.', 9, 'A small miracle of a film', 'The Weight of Small Things is the kind of movie that makes you call someone you love immediately after watching. Tender, honest, and perfectly acted.'),
  (7, 'Ola M.', 10, 'The best sci-fi film in years', 'Clockwork City is both a sharp social satire and a deeply emotional story. The AI poetry subplot sounds gimmicky but it''s handled with extraordinary care.'),
  (7, 'Bex W.', 9, 'Unexpected and brilliant', 'I went in expecting a dystopian thriller and got a meditation on loneliness and creativity. Reyes is a filmmaker to watch.'),
  (8, 'Naomi S.', 7, 'Charming road trip comedy', 'Punchline is warm and funny with a central performance that carries it all. The jokes land more than they miss.'),
  (9, 'Franco G.', 8, 'A slow burn worth every minute', 'Burnt Offerings layers its mystery carefully. By the time the truth is out you''ve been fully absorbed into this small town''s secrets.'),
  (10, 'Claire H.', 9, 'Tense from first to last', 'Last Exit is a masterclass in confined-space tension. Every character is a suspect and the script never cheats.'),
  (10, 'Tom K.', 7, 'More setup than payoff', 'Great atmosphere and strong performances, though the resolution feels slightly rushed. Worth watching for the ensemble work alone.');
