import axios from 'axios'

export const sendNotification = (body) => {
	return new Promise(async (resolve, reject) => {
		await axios
			.post(
				'https://kbincznqve.execute-api.ap-southeast-1.amazonaws.com/prod/whatsapp/send',
				body
			)
			.then((response) => {
				console.log('Successfully notified')
				resolve(response)
			})
			.catch((err) => {
				console.log('Error while posting', err)
				reject(err)
			})
	})
}
