export const ATTRIBUTE_KEY = 'data-theme';
export const STORAGE_KEY = 'theme';

export const LIGHT_THEME = 'lemonade';
export const DARK_THEME = 'dim';
export const VALID_THEMES = [LIGHT_THEME, DARK_THEME] as const;

export function handleThemeChange(event: Event) {
	const checked = (event.currentTarget as HTMLInputElement).checked;
	const theme = checked ? LIGHT_THEME : DARK_THEME;
	localStorage.setItem(STORAGE_KEY, theme);
	document.documentElement.setAttribute(ATTRIBUTE_KEY, theme);
}
