-- Revoke EXECUTE on handle_new_user from public roles (trigger-only function)
-- This prevents anon/authenticated users from calling the SECURITY DEFINER function directly

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
