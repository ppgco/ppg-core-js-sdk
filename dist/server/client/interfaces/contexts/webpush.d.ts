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
    /**
     * Mobile platforms
     */
    badge?: number;
}
export interface WebPushAction extends ActionBehaviour {
    action: string;
    title: string;
    icon?: Url;
}
export interface WebPushContext extends ActionBehaviour, OurMobileExtensions {
    actions?: WebPushAction[];
    badge?: number;
    body?: string;
    smallIcon?: string;
    icon?: string;
    image?: string;
    title?: string;
    externalData?: string;
}
export {};
