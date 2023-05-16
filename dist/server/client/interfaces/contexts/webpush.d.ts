import { Url } from "../common";
export type Direction = 'auto' | 'ltr' | 'rtl';
type NoneBehaviour = string;
type BrowserBehaviour = string;
type DeepLinkBehaviour = string & BrowserBehaviour;
export interface ActionBehaviour {
    behaviour?: NoneBehaviour | BrowserBehaviour;
    behaviourAndroid?: NoneBehaviour | BrowserBehaviour | DeepLinkBehaviour;
    behaviourHuawei?: NoneBehaviour | BrowserBehaviour | DeepLinkBehaviour;
    behaviourIos?: NoneBehaviour | BrowserBehaviour;
    behaviourWebPush?: NoneBehaviour | BrowserBehaviour;
}
export interface OurMobileExtensions {
    /**
     * ApnsSafari
     */
    subtitle?: string;
    defaultActionLabel?: string;
    /**
     * Mobile platforms non-standard / standard
     */
    sound?: string;
    soundAndroid?: string;
    soundIos?: string;
    /**
     * Mobile platforms
     */
    badgeMobile?: number;
}
export interface WebPushAction extends ActionBehaviour {
    action: string;
    title: string;
    icon: Url;
    actionUrl: Url;
}
export interface WebPushContext extends ActionBehaviour, OurMobileExtensions {
    defaultAction?: Url;
    actions?: WebPushAction[];
    badge?: Url;
    body?: string;
    dir?: Direction;
    lang?: string;
    tag?: string;
    icon?: string;
    image?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    title?: string;
    vibrate?: number[];
}
export {};
