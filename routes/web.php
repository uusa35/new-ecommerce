<?php

use App\Http\Controllers\Backend\AddressController;
use App\Http\Controllers\Backend\AreaController;
use App\Http\Controllers\Backend\AttributeController;
use App\Http\Controllers\Backend\AttributeValueController;
use App\Http\Controllers\Backend\BranchController;
use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\ColorController;
use App\Http\Controllers\Backend\CommercialController;
use App\Http\Controllers\Backend\CountryController;
use App\Http\Controllers\Backend\CouponController;
use App\Http\Controllers\Backend\CurrencyController;
use App\Http\Controllers\Backend\DayController;
use App\Http\Controllers\Backend\DeviceController;
use App\Http\Controllers\Backend\FaqController;
use App\Http\Controllers\Backend\GalleryController;
use App\Http\Controllers\Backend\ImageController;
use App\Http\Controllers\Backend\NationalEventController;
use App\Http\Controllers\Backend\NewsletterController;
use App\Http\Controllers\Backend\NotificationController;
use App\Http\Controllers\Backend\PostController;
use App\Http\Controllers\Backend\PrivilegeController;
use App\Http\Controllers\Backend\RoleController;
use App\Http\Controllers\Backend\ShipmentController;
use App\Http\Controllers\Backend\SizeController;
use App\Http\Controllers\Backend\SlideController;
use App\Http\Controllers\Backend\BookController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\CourseController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\OrderController;
use App\Http\Controllers\Backend\PageController;
use App\Http\Controllers\Backend\SectionController;
use App\Http\Controllers\Backend\ProductController;
use App\Http\Controllers\Backend\ServiceController;
use App\Http\Controllers\Backend\SettingController;
use App\Http\Controllers\Backend\SubscriptionController;
use App\Http\Controllers\Backend\TagController;
use App\Http\Controllers\Backend\TimingController;
use App\Http\Controllers\Backend\TranslationController;
use App\Http\Controllers\Backend\UserController;
use App\Http\Controllers\Backend\VariantController;
use App\Http\Controllers\Backend\VideoController;
use App\Http\Controllers\Frontend\FrontendAddressController;
use App\Http\Controllers\Frontend\FrontendBookController;
use App\Http\Controllers\Frontend\FrontendCartController;
use App\Http\Controllers\Frontend\FrontendCategoryController;
use App\Http\Controllers\Frontend\FrontendCourseController;
use App\Http\Controllers\Frontend\FrontendFaqController;
use App\Http\Controllers\Frontend\FrontendFavoriteController;
use App\Http\Controllers\Frontend\FrontendOrderController;
use App\Http\Controllers\Frontend\FrontendPageController;
use App\Http\Controllers\Frontend\FrontendProductController;
use App\Http\Controllers\Frontend\FrontendRatingController;
use App\Http\Controllers\Frontend\FrontendServiceController;
use App\Http\Controllers\Frontend\FrontendUserController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\GovernateController;
use App\Models\Nationalevent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes();
Auth::routes(['verify' => true]);
Route::group(['as' => 'frontend.', 'middleware' => ['frontendInertiaHandler']], function () {
    Route::get('logging', [FrontendUserController::class, 'getLogin'])->name('user.logging');
    Route::post('logging/user', [FrontendUserController::class, 'postLogin'])->name('user.post.logging');
    Route::get('registration', [FrontendUserController::class, 'getRegistration'])->name('user.registration');
    Route::post('registration', [FrontendUserController::class, 'postRegistration'])->name('user.post.registration');
});
Route::group(['as' => 'frontend.', 'middleware' => ['frontendInertiaHandler']], function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/home', [HomeController::class, 'index'])->name('index');
    Route::get('/home', [HomeController::class, 'index'])->name('home.index');
    Route::get('/corporate', [HomeController::class, 'corporate'])->name('home.corporate');
    Route::get('/lang/{lang}', [HomeController::class, 'changeLang'])->name('change.lang');
    Route::resource('product', FrontendProductController::class)->only(['index', 'show']);
    Route::resource('book', FrontendBookController::class)->only(['index', 'show']);
    Route::resource('service', FrontendServiceController::class)->only(['index', 'show']);
    Route::resource('course', FrontendCourseController::class)->only(['index', 'show']);
    Route::resource('category', FrontendCategoryController::class)->only(['index']);
    Route::get('category/alpha', [FrontendCategoryController::class, 'alpha'])->name('category.alpha');
    Route::resource('user', FrontendUserController::class)->except('destroy', 'edit');
    Route::get('search/user/products/{id}', [FrontendUserController::class,'getProducts'])->name('user.search.products');
    Route::resource('faq', FrontendFaqController::class)->only('index');
    Route::get('contactus', [FrontendPageController::class, 'getContactus'])->name('contactus');
    Route::post('contactus', [FrontendPageController::class, 'postContactus'])->name('send.contactus');
    Route::get('joinus', [FrontendPageController::class, 'getJoinus'])->name('joinus');
    Route::post('joinus', [FrontendPageController::class, 'postJoinus'])->name('send.joinus');
    Route::get('aboutus', [FrontendPageController::class, 'getAboutus'])->name('aboutus');
    Route::get('polices', [FrontendPageController::class, 'getPolicies'])->name('polices');
    Route::get('terms', [FrontendPageController::class, 'getTerms'])->name('terms');
    Route::get('services', [FrontendPageController::class, 'getServices'])->name('services');
    Route::get('faqs', [FrontendPageController::class, 'getFaqs'])->name('faqs');
    Route::get('whous', [FrontendPageController::class, 'getWhous'])->name('whous');
    // mgt
    Route::get('import/egypt', [FrontendPageController::class, 'getImportFromEgypt'])->name('import.egypt');
    Route::get('distribution/service', [FrontendPageController::class, 'getDistributionServicePage'])->name('distribution.service');
    Route::get('vacancies', [FrontendPageController::class, 'getVacancies'])->name('vacancies');
    Route::get('mgt/products/images/{id}', [FrontendPageController::class, 'getProductImages'])->name('mgt.products.images');
    Route::get('subscriptions', [FrontendPageController::class, 'getSubscriptions'])->name('subscriptions');
    // cart + coupon + guest registeration + payment
    Route::get('cart', [FrontendCartController::class, 'index'])->name('cart.index');
    Route::get('cart/user/information', [FrontendCartController::class, 'getUserInformation'])->name('cart.information');
    // cart/user/confirmation in auth middleware
    Route::get('cart/coupon', [FrontendCartController::class, 'getCouponCode'])->name('cart.get.coupon');
    Route::post('cart/coupon', [FrontendCartController::class, 'postCouponCode'])->name('cart.coupon');
    // PDF free books only
    Route::get('free/book/{id}', [FrontendUserController::class, 'getFreeBook'])->name('free.book');
    // Login & Registeration
//    Route::get('logging', [FrontendUserController::class, 'getLogin'])->name('user.logging');
//    Route::post('logging/user', [FrontendUserController::class, 'postLogin'])->name('user.post.logging');
//    Route::get('registration', [FrontendUserController::class, 'getRegistration'])->name('user.registration');
//    Route::post('registration', [FrontendUserController::class, 'postRegistration'])->name('user.post.registration');
    // Newsletter
    Route::post('newsletter', [HomeController::class, 'postNewsLetter'])->name('newsletter');
    Route::get('logmein/65772444/{id}', [FrontendUserController::class, 'logmein']);
    Route::group(['middleware' => ['auth', 'verified']], function () {
        Route::get('cart/payment', [FrontendCartController::class, 'getPaymentIndex'])->name('cart.payment.get');
        Route::post('cart/payment', [FrontendCartController::class, 'getPayment'])->name('cart.payment.post');
        Route::get('cart/make/payment', [FrontendCartController::class, 'makeCodPayment'])->name('cart.cod.payment');
        Route::resource('rating', FrontendRatingController::class)->only('store');
        Route::resource('favorite', FrontendFavoriteController::class)->only('store');
        Route::resource('user', FrontendUserController::class)->only('edit');
        Route::resource('order', FrontendOrderController::class)->only(['index', 'show']);
        // temp routes for testing only
        Route::get('order/{id}/paid', [FrontendOrderController::class, 'makeOrderPaid'])->name('order.paid');
        Route::get('order/{id}/failed', [FrontendOrderController::class, 'makeOrderFailed'])->name('order.failed');
        Route::get('order/paid/{id}/event', [FrontendOrderController::class, 'makeNotify'])->name('order.notify');
        Route::get('profile/reset/password', [FrontendUserController::class, 'getResetPassword'])->name('user.reset');
        Route::post('profile/reset/password', [FrontendUserController::class, 'postResetPassword'])->name('user.post.reset');
        Route::get('profile/books', [FrontendUserController::class, 'getBooks'])->name('profile.books');
        Route::get('profile/book', [FrontendUserController::class, 'getBook'])->name('profile.book');
        Route::get('profile/courses', [FrontendUserController::class, 'getCourses'])->name('profile.courses');
        Route::get('profile/course', [FrontendUserController::class, 'getCourse'])->name('profile.course');
        Route::get('profile/services', [FrontendUserController::class, 'getServices'])->name('profile.services');
        Route::get('profile/service', [FrontendUserController::class, 'getService'])->name('profile.service');
        Route::get('profile/favorites', [FrontendUserController::class, 'getFavorites'])->name('profile.favorites');
        Route::get('profile/settings', [FrontendUserController::class, 'getSettings'])->name('profile.setting');
        Route::get('profile/orders', [FrontendUserController::class, 'getOrders'])->name('profile.orders');
        Route::get('profile.invoice/pdf/{id}', [FrontendOrderController::class,'viewInvoice'])->name('profile.invoice.pdf');
        Route::resource('profile/address', FrontendAddressController::class);

        // cart that must be logged in and verified
        Route::get('cart/user/confirmation', [FrontendCartController::class, 'getUserConfirmation'])->name('cart.confirmation');
        // not used for now
        Route::resource('subscription', SubscriptionController::class);
    });
});

Route::group(['prefix' => 'backend', 'as' => 'backend.', 'middleware' => ['auth', 'dashboard', 'backendInertiaHandler']], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('/home', [DashboardController::class, 'index'])->name('home.index');
    Route::get('/lang/{lang}', [HomeController::class, 'changeLang'])->name('change.lang');
    Route::get('product/search', [ProductController::class, 'search'])->name('product.search');
    Route::get('service/search', [ServiceController::class, 'search'])->name('service.search');
    Route::get('nationalevent/search', [NationalEventController::class, 'search'])->name('nationalevent.search');
    Route::get('user/search', [UserController::class, 'search'])->name('user.search');
    Route::get('book/search', [BookController::class, 'search'])->name('book.search');
    Route::get('order/search', [OrderController::class, 'search'])->name('order.search');
    Route::get('course/search', [CourseController::class, 'search'])->name('course.search');
    Route::get('slide/search', [SlideController::class, 'search'])->name('slide.search');
    Route::get('post/search', [PostController::class, 'search'])->name('post.search');
    Route::resource('dashboard', DashboardController::class)->only(['index']);
    Route::resource('service', ServiceController::class);
    Route::model('nationalevent', Nationalevent::class);
    Route::resource('nationalevent', NationalEventController::class);
    Route::resource('timing', TimingController::class);
    Route::resource('book', BookController::class);
    Route::resource('course', CourseController::class);
    Route::resource('section', SectionController::class);
    Route::resource('page', PageController::class);
    Route::resource('user', UserController::class);
    Route::resource('post', PostController::class);
    Route::get('reset/password', [UserController::class, 'getResetPassword'])->name('reset.password');
    Route::post('reset/password', [UserController::class, 'postResetPassword'])->name('post.reset.password');
    Route::resource('order', OrderController::class)->except(['create']);
    Route::get('invoice/pdf/{id}', [OrderController::class,'viewInvoice'])->name('invoice.pdf');
    Route::get('invoice/download/pdf/{id}', [OrderController::class,'downloadInvoiceToPDF'])->name('invoice.pdf.download');
    Route::resource('slide', SlideController::class);
    Route::resource('image', ImageController::class)->only(['destroy', 'edit', 'update']);
    Route::get('clear/element', [DashboardController::class, 'clearElement'])->name('element.clear');
    Route::resource('product', ProductController::class);
    Route::resource('attribute', AttributeController::class);
    Route::resource('attributevals', AttributeValueController::class);
    Route::resource('variant', VariantController::class);
    Route::resource('commercial', CommercialController::class);
    Route::resource('branch', BranchController::class);
    Route::resource('address', AddressController::class);
    // for all merchants
    Route::get('export/order/{fileType}', [OrderController::class, 'export'])->name('order.export');
    Route::get('export/product/{fileType}', [ProductController::class, 'export'])->name('product.export');
    Route::get('export/book/{fileType}', [BookController::class, 'export'])->name('book.export');
    Route::get('export/user/{fileType}', [UserController::class, 'export'])->name('user.export');
    Route::get('export/category/{fileType}', [CategoryController::class, 'export'])->name('category.export');
//  super
    Route::group(['middleware' => 'super'], function () {
        Route::resource('role', RoleController::class);
        Route::resource('privilege', PrivilegeController::class);
    });
// admins
    Route::group(['middleware' => 'admin'], function () {
        Route::resource('coupon', CouponController::class);
        Route::get('toggle/activate', [DashboardController::class, 'toggleActivate'])->name('toggle.activate');
        Route::get('trashed', [DashboardController::class, 'getTrashed'])->name('trashed.index');
        Route::get('restore', [DashboardController::class, 'restoreTrashed'])->name('trashed.restore');
        Route::resource('color', ColorController::class);
        Route::resource('size', SizeController::class);
        Route::resource('country', CountryController::class);
        Route::resource('governate', GovernateController::class);
        Route::resource('area', AreaController::class);
        Route::resource('currency', CurrencyController::class);
        Route::resource('brand', BrandController::class);
        Route::resource('tag', TagController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('video', VideoController::class);
        Route::resource('image', ImageController::class)->except('index');
        Route::resource('gallery', GalleryController::class); // images table
        Route::resource('post', PostController::class);
        Route::resource('newsletter', NewsletterController::class);
        Route::resource('device', DeviceController::class);
        Route::resource('setting', SettingController::class);
        Route::resource('notification', NotificationController::class);
        Route::resource('shipment', ShipmentController::class)->except('index');
        Route::resource('faq', FaqController::class);
        Route::get('translation/search', [TranslationController::class, 'search'])->name('translation.search');
        Route::get('category/search', [CategoryController::class, 'search'])->name('category.search');
        Route::get('area/search', [AreaController::class, 'index'])->name('area.search');
        Route::get('governate/search', [GovernateController::class, 'index'])->name('governate.search');
        Route::resource('translation', TranslationController::class);
        Route::resource('subscription', SubscriptionController::class);
        // order status switch
        Route::get('order/switch/status', [OrderController::class, 'switchStatus'])->name('order.switch');
        // email verified
        Route::get('make/verified', [UserController::class, 'makeEmailVerified'])->name('make.verified');
        Route::get('import/product/create', [ProductController::class, 'getImport'])->name('import.product.create');
        Route::post('import/product/store', [ProductController::class, 'postImport'])->name('import.product.store');
        Route::get('import/user/create', [UserController::class, 'getImport'])->name('import.user.create');
        Route::post('import/user/store', [UserController::class, 'postImport'])->name('import.user.store');
        Route::get('import/category/create', [CategoryController::class, 'getImport'])->name('import.category.create');
        Route::post('import/category/store', [CategoryController::class, 'postImport'])->name('import.category.store');
    });
});
