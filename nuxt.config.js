import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	ssr: false,
	modules: ['nuxt-ionic'],
	ionic: {
		css: {
			utilities: true
		}
	},
	components: [
		{
			path: '@/components',
			pathPrefix: false
		}
	]
})
