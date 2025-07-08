import { supabase } from './supabase-client';

export const signUp = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error) throw error;
	return data;
};

export const signIn = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw error;
	return data;
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
};

export const getUser = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	return data.user;
};

export const resetPasswordForEmail = async (email: string) => {
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset_password`,
	});
	if (error) throw error;
	return data;
};

export const updatePassword = async (newPassword: string) => {
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword,
	});
	if (error) throw error;
	return data;
};
