<script setup>
import duration from 'dayjs/plugin/duration'
import { ionInputTimeFormat } from '../composables/helpers'
import dayjs from 'dayjs'
dayjs.extend(duration)

const spreadsheetId = '1fgrddOab7r7Y_QjnvDFA6McEExXmfVbj7C1BXSYfW14'

const todayDate = dayjs().format('YYYY-MM-DD')

const now = dayjs()

const St = ref(now.add(-9, 'hour').set('second', 0).toDate())
const Wt = ref(now.add(-15, 'minute').set('second', 0).toDate())

const NWt = ref()
const NSt = ref()

const NWDuration = computed(() => {
	return NWt.value && NSt.value
		? getDuration(NWt.value, NSt.value, false)
		: null
})
const NWDurationStr = computed(() =>
	NWDuration.value ? ionInputTimeFormat(NWDuration.value) : ''
)

const Pt = ref(Wt.value)
const PtSetByUser = ref(false)
watch(Wt, () => {
	if (!PtSetByUser.value) {
		Pt.value = Wt.value
	}
})

watch(PtSetByUser, () => {
	console.log('PtSetByUser', PtSetByUser.value)
})

const timeSlept = computed(() => {
	const total = getDuration(St.value, Wt.value, false)
	if (NWDuration.value) {
		console.log('total nw', total)
		return total - NWDuration.value
	}
	console.log('total', total)
	return total
})
const timeSleptStr = computed(() => ionInputTimeFormat(timeSlept.value))
const Ph = computed(() => getDuration(St.value, Pt.value, true))

async function onSubmit() {
	const response = await fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				valueInputOption: 'USER_ENTERED',
				insertDataOption: 'INSERT_ROWS',
				values: [
					[
						todayDate,
						dayjs(St.value).format('HH:mm'),
						dayjs(Wt.value).format('HH:mm'),
						dayjs(Pt.value).format('HH:mm'),
						dayjs(NSt.value).format('HH:mm'),
						dayjs(NWt.value).format('HH:mm'),
						timeSleptStr.value,
						NWDurationStr.value,
						Ph.value
					]
				]
			})
		}
	)
}
</script>

<template>
	<Page>
		<Inp calcd v-model="todayDate">Date</Inp>

		<h1>Morning</h1>
		<h2>Sleeping</h2>

		<Inp calcd v-model="YLOt">Yesterday LOT</Inp>

		<Inp type="datetime-local" v-model="St">Sleep time</Inp>
		<Inp type="datetime-local" v-model="Wt">Wake time</Inp>

		<Inp type="datetime-local" v-model="NWt">Night wake time</Inp>
		<Inp type="datetime-local" v-model="NSt">Night sleep time</Inp>
		<Inp calcd v-model="NWDurationStr">Night wake duration</Inp>

		<Inp calcd v-model="timeSleptStr">Time slept</Inp>

		<Inp
			type="datetime-local"
			v-model="Pt"
			:tracking="!PtSetByUser"
			@click="PtSetByUser = true"
		>
			Pt
		</Inp>
		<Inp calcd v-model="Ph">Ph</Inp>
		<Inp>N Desc</Inp>

		<h2>D</h2>
		<Inp>V</Inp>
		<Inp>C</Inp>
		<Inp>Ct</Inp>
		<Inp calcd v-model="Ch">Ch</Inp>

		<h1>Night</h1>
		<h2>HFIT</h2>
		<Inp>H</Inp>
		<Inp>F</Inp>
		<Inp>I</Inp>
		<Inp>T</Inp>
		<Inp>Tt</Inp>
		<Inp>Tw</Inp>
		<Inp>Not enough (H,F,M)</Inp>
		<Inp>Desc</Inp>

		<Inp type="datetime-local" v-model="LOt">Lights off time</Inp>

		<ion-button @click="onSubmit">Submit day</ion-button>
	</Page>
</template>
