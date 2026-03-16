export interface PaymentInterface {
  "transactionId": string,
  "purchaseDate": string,
  "location": string,
  "productName": string,
  "fullValue": number,
  "productDiscountPercentage": number,
  "value": number,
  "invoiceSubtotal": number,
  "onlinePaymentDiscountPercentage": number,
  "totalPaid": number,
  "buyerName": string,
  "buyerIdentificationNumber": string,
  "buyerEmail": string,
  "hasElectronicInvoice": boolean
}
