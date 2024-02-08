<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('Articles', [ArticleController::class,'index']);
Route::get('Article/{id}', [ArticleController::class,'show']);
Route::post('AddArticle', [ArticleController::class,'store']);
Route::put('Update/{id}', [ArticleController::class,'update']);
Route::delete('Article/{id}', [ArticleController::class,'destroy']);