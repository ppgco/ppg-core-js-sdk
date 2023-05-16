
export interface CommonContext {
	title: string;
	body?: string;
	data?: Record<string, string>;
	/**
	 * One of "expiresAt" or "ttl" is required.
	 * If no one is given.
	 * Tll is being set to 24h.
	 * @see ttl
	 */
	expiresAt?: string;
	/**
	 * One of "expiresAt" or "ttl" is required.
	 * If no one is given.
	 * Tll is being set to 24h.
	 * @see expiresAt
	 */
	ttl?: number;
}