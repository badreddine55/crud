<?php

namespace App\Http\Controllers;

use App\Models\article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleController extends Controller
{
    public function index()
    {
        $article = article::all();
        return response()->json(['articles' => $article]);
    }

    public function show($id)
    {
        $article = article::findOrFail($id);
        return response()->json(['article' => $article], 200);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'body' => 'required',
            'image' => 'required',
        ]);
        if (request()->has('image')) {
            $imagePath = request()->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        };
        $article = article::create($validatedData);
        return response()->json(['cv' => $article, 'message' => 'article created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = ([
            'title' => $request->title,
            'body' => $request->body,
            'image' => $request->image,
        ]);
        if (request()->has('image')) {
            $imagePath = request()->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        };
        DB::table('article')->where('id', $id)->update($validatedData);
        return response('update good');
    }

    public function destroy($id)
    {
        $article = article::find($id);
        $article->delete();
    }
}
