-- Migration: seed_daycares
-- Inserts four initial daycare records (idempotent)

INSERT INTO daycares (name)
SELECT v.name
FROM (VALUES
    ('Guardería Sala Soles'),
    ('Guardería Lunas'),
    ('Guardería Estrellitas'),
    ('Guardería Arcoíris')
) AS v(name)
WHERE NOT EXISTS (
    SELECT 1 FROM daycares d WHERE d.name = v.name
);
