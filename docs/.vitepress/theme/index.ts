import {Icon} from "@iconify/vue";
import type {EnhanceAppContext} from "vitepress";
import DefaultTheme from 'vitepress/theme';

import API from "./components/API.vue";
import FeatureLinks from "./components/FeatureLinks.vue";
import GitHubFeed from "./components/GitHubFeed.vue";
import Home from "./components/Home.vue";
import MissionStatement from "./components/MissionStatement.vue";
import Note from "./components/Note.vue";
import Overview from "./components/Overview.vue";
import Playground from "./components/Playground.vue";
import ResourcesLinkGrid from "./components/ResourcesLinkGrid.vue";
import Spec from "./components/Spec.vue";
import Layout from './Layout.vue';

import './custom.css';

import _redirects from "/_redirects?url&raw";
const redirects = _redirects.split('\n').filter(String).map((item: string[]) => item.split(/\x20+/)).filter((item: string) => item[0].indexOf(':')===-1 && item[0].indexOf('*')===-1);

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp({ app, router }: EnhanceAppContext): void {
    app.component('API',API)
    app.component('FeatureLinks',FeatureLinks)
    app.component('GitHubFeed',GitHubFeed)
    app.component('Home',Home)
    app.component('IconifyIcon',Icon)
    app.component('MissionStatement',MissionStatement)
    app.component('Note',Note)
    app.component('Overview',Overview)
    app.component('Playground',Playground)
    app.component('ResourcesLinkGrid',ResourcesLinkGrid)
    app.component('Spec',Spec)

    router.onAfterRouteChange = async (to: string) => {
      // Static redirects
      redirects.forEach((item: string[]) => {
        if(to===item[0] || to.startsWith(item[0]+'?') || to.startsWith(item[0]+'#')){
          router.go(item[1]);
        }
      });
    };
  },
  extends: DefaultTheme,
};
