<script setup>
const props = defineProps({
	type: {
		type: String
	},
	calcd: {
		type: Boolean,
		default: false
	},
	tracking: {
		type: Boolean,
		default: false
	},
	modelValue: {
		type: [String, Number, Date]
	}
})
const emit = defineEmits(['update:modelValue'])

const tracking = computed(() => (props.calcd ? true : props.tracking))

const value = computed({
	get() {
		return props.modelValue instanceof Date
			? ionInputDateTimeFormat(props.modelValue)
			: props.modelValue
	},
	set(val) {
		emit('update:modelValue', val)
	}
})
</script>

<template>
	<ion-item fill="outline" class="ion-padding">
		<ion-text :color="tracking ? 'secondary' : ''">
			<ion-label :position="calcd ? 'stacked' : 'floating'">
				<slot></slot>
			</ion-label>
			<ion-input :readonly="calcd" :type="type" v-model="value" />
		</ion-text>
	</ion-item>
</template>
