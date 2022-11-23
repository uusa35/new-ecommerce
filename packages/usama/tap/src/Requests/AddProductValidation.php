<?php
namespace Usama\Tap\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddProductValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'currencyCode' => 'alpha',
            'imgUrl' => 'url|nullable',
            'quantity' => 'digits_between:1,10',
            'totalPrice' => 'digits',
            'unitDesc' => 'alpha_numeric|nullable',
            'unitId' => 'alpha_numeric|nullable',
            'unitName' => 'alpha_numeric',
            'unitPrice' => 'integer',
            'vndID' => 'nullable'
        ];
    }
}
