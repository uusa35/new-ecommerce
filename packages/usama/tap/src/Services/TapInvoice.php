<?php
namespace Usama\Tap\Services;


use App\Models\Deal;

class TapInvoice implements PaymentContract
{

    public $deal;

    public function __construct($response,$dealId)
    {
        $this->dealId = $dealId;
        $this->response = $response;
    }

    /**
     * results Object :
     *  +"PaymentURL": "https://live.gotapnow.com/webpay.aspx?ref=207172017102625563&sess=KzN5mY1hZvlblLJi%2b%2fFQGJLvMBlE7W%2fD"
     * +"ReferenceID": "207172017102625563"
     * +"ResponseCode": "0"
     * +"ResponseMessage": "Success"
     * +"TapPayURL": "https://live.gotapnow.com/webpay.aspx"
     */
    public function storePayment()
    {
        // store the cart if you want from session()->get('cart')
        // store the payment results if you want in your DB by accessing to $this->response;
        $deal = Deal::withoutGlobalScopes()->whereId($this->dealId)->first();
        // make all other deals for the same ad_id is invalid except this deal
        // review
        // i shall not deactivate all free deals unless the result it will come with full payment success !!
//        $deals = Deal::where(['ad_id' => $deal->ad_id])->where('id','!=',$deal->id)->get();
//        foreach($deals as $d) {
//            $d->update(['valid' => false]);
//        }
        $deal->update(['reference_id' => $this->response->ReferenceID]);
    }
}
