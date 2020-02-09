DROP table IF EXISTS message CASCADE;

create table message
(
    id serial not null
        constraint message_pkey
            primary key,
    created_at timestamp,
    updated_at timestamp,
    message text not null
);

CREATE OR REPLACE FUNCTION set_created_at()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = now();
    NEW.updated_at = NEW.created_at;
    RETURN NEW;
END;
$$ language 'plpgsql';;

BEGIN;;
DO $$
    DECLARE
        t text;
    BEGIN
        FOR t IN
            SELECT  table_name FROM information_schema.columns
            WHERE column_name = 'created_at' AND table_schema = 'public'
            LOOP
                EXECUTE format('DROP TRIGGER IF EXISTS set_created_at_%I_trigger ON %I',t, t);
                EXECUTE format('CREATE TRIGGER set_created_at_%I_trigger
                                BEFORE INSERT ON %I
                                FOR EACH ROW EXECUTE PROCEDURE set_created_at()',t, t);

            END loop;
    END;
$$ language 'plpgsql';;
COMMIT;;

CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';;

BEGIN;;
DO $$
    DECLARE
        t text;
    BEGIN
        FOR t IN
            SELECT  table_name FROM information_schema.columns
            WHERE column_name = 'updated_at' AND table_schema = 'public'
            LOOP
                EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at_%I_trigger ON %I',t, t);
                EXECUTE format('CREATE TRIGGER set_updated_at_%I_trigger
                                BEFORE UPDATE ON %I
                                FOR EACH ROW EXECUTE PROCEDURE set_updated_at()',t, t);

            END loop;
    END;
$$ language 'plpgsql';;
COMMIT;;