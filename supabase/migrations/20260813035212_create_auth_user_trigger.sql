-- Create trigger to auto-create users row on auth.users insert

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (
        id,
        daycare_id,
        role,
        status,
        full_name,
        notify_on_post,
        daily_summary_enabled
    ) VALUES (
        NEW.id,
        (NEW.raw_user_meta_data->>'daycare_id')::uuid,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'parent'::user_role),
        COALESCE((NEW.raw_user_meta_data->>'status')::user_status, 'active'::user_status),
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Unknown'),
        COALESCE((NEW.raw_user_meta_data->>'notify_on_post')::boolean, true),
        COALESCE((NEW.raw_user_meta_data->>'daily_summary_enabled')::boolean, true)
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
