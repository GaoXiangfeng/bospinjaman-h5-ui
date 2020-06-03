import Router from 'vue-router'

const download = require('./app/page/download/download.vue')
const repayment = require('./app/page/repayment/repayment.vue')
const routes = [
	{
		path: '/download',
		name: 'download',
		// alias: ['/:channelId'],
		meta: {
			title: 'download',
			needKeepAlive: true,
		},
		component: download
	},
	{
		path: '/repayment',
		name: 'repayment',
		meta: {
			title: 'repayment',
			needKeepAlive: true,
		},
		component: repayment
	},
]

const router = new Router({
	mode: 'history',
	routes: routes
})

export default router
