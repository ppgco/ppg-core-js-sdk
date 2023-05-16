import {WebPushContext} from "./contexts/webpush";
import {CommonContext} from "./contexts/common";

export interface RawContextMetadata {
	huawei?: {},
	chromium?: WebPushContext,
	edge?: WebPushContext,
	firefox?: WebPushContext,
	ios?: {},
	android?: {},
	common: CommonContext,
	safari?: {},
	safariVapid?: WebPushContext,
}

export interface SilentContextMetadata {
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

export interface DataContextMetadata extends SilentContextMetadata, WebPushContext {
	
} 
