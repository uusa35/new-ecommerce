@extends('layouts.app')

@section('scripts')
    <link href="{{ asset('css/styles.css') }}" rel=stylesheet>
    <link href="{{ asset('css/themes/theme-bottle.css') }}" rel=stylesheet id=theme>
    <link href="{{ asset('css/shelf.css') }}" rel=stylesheet>
    <link href="{{ asset('css/book.css') }}" rel=stylesheet>
    <link href={{ asset('pflip/css/pdfflip.css') }} rel=stylesheet>
@endsection


@section('content')
    <div class="row pt-50 theshelf" style="width:96%; margin:2%;">

        <div class="col-md-2 col-xs-6">
            <center>
                <li class=book style=width:172px;height:243px>
                    <a class=_PDFF_link id=PDFF backgroundimage="{{ asset('pflip/background.jpg') }}"
                       source="{{ asset('PDF.pdf') }}"/>
                    <img src=thb.jpg>
                    </a>
                </li>
            </center>
        </div>


        <div class="col-xs-12 shelf"></div>
    </div>
@endsection

@section('scripts')
    <script src="{{ asset("js/libs/utils.js") }}"></script>
    <script src="{{ asset("js/plugins.js") }}"></script>
    <script src="{{ asset("js/core.js") }}"></script>
    <script src="{{ asset('pflip/js/pdfflip.js') }}"></script>
    <script src="{{ asset('pflip/js/open.js') }}"></script>
    <script src="{{ asset('js/settings.js') }}"></script>
    <script src="{{ asset('js/toc.js') }}"></script>
@endsection
