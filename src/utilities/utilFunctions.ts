export const toTitleCase = (toTransform: string) => {
  return toTransform.replace(/\b([a-z])/g, function (_, initial) {
    return initial.toUpperCase()
  })
}

const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

export const processPaymentRazorPay = async (orderAmt: number, callbackFunc: any) => {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  if (!res) {
    alert('Razorpay SDK failed to load.')
    return
  }

  const options = {
    key: 'rzp_test_oTeKhXvrlA5LXo',
    amount: (orderAmt * 100).toString(),
    currency: 'INR',
    name: 'Little Tags Theta',
    description: 'Test Transaction',
    handler: async function (response: any) {
      // alert('Payment id: ' + response.razorpay_payment_id)
      callbackFunc(response.razorpay_payment_id)
    },
    prefill: {
      name: '<YOUR NAME>',
      email: 'example@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'Example Corporate Office',
    },
    theme: {
      color: '#61dafb',
    },
  }

  const paymentObject = new (window as any).RazorPay(options)
  paymentObject.open()
}

export const getValidArray = (optionsArr: string[], qsArr: any, key: string): string[] => {
  if (typeof qsArr[key] === 'string') {
    const qsValue = qsArr[key]
    if (optionsArr.indexOf(qsValue) >= 0) {
      return [qsValue]
    } else {
      return []
    }
  } else {
    const arr = [...qsArr[key]]
    const validArr = arr.filter((ele) => optionsArr.indexOf(ele) >= 0)
    return [...validArr]
  }
}

export const getQueryStringFromStates = (
  globalSearch: string,
  categories: string[],
  brands: string[],
  discounts: string[],
  deliveryTime: string[]
) => {
  let queryString = '?'

  if (globalSearch) queryString += `q=${globalSearch}`
  categories.forEach((gender) => (queryString += `&category=${gender}`))
  brands.forEach((brand) => (queryString += `&brand=${brand}`))
  discounts.forEach((discount) => (queryString += `&discount=${discount}`))
  deliveryTime.forEach((delivery) => (queryString += `&deliveryTime=${delivery}`))

  return queryString
}
