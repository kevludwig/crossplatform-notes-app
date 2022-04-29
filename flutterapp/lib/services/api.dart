import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutterapp/models/note.dart';
import 'package:http/http.dart' as http;

/// The API class is responsible for all the communication with the server.
abstract class Api {
  static const String baseUrl = "http://localhost:3000";

  // CREATE
  static Future<Note> createNote(note) async {
    final response = await http.post(Uri.parse('$baseUrl/notes'),
        headers: {"Content-Type": "application/json"}, body: json.encode(note));

    if (response.statusCode == 200) {
      Note note = Note.fromJson(json.decode(response.body));
      return note;
    } else {
      throw Exception('Failed to create note!');
    }
  }

  // READ
  static Future<List<Note>> getNotes() async {
    final response = await http.get(Uri.parse('$baseUrl/notes'));

    if (response.statusCode == 200) {
      List<dynamic> values = [];
      values = json.decode(response.body);

      List<Note> tmp = [];
      values.map((e) => tmp.add(Note.fromJson(e))).toList();

      return Future.value(tmp);
    } else {
      throw Exception('Failed to load notes!');
    }
  }

  // UPDATE
  static Future<Note> updateNote(id, note) async {
    final response = await http.put(Uri.parse('$baseUrl/notes/$id'),
        headers: {"Content-Type": "application/json"}, body: json.encode(note));

    if (response.statusCode == 200) {
      Note note = Note.fromJson(json.decode(response.body));
      return note;
    } else {
      throw Exception('Failed to update note!');
    }
  }

  // DELETE
  static Future<Note> deleteNote(id, context) async {
    final response = await http.delete(Uri.parse('$baseUrl/notes/$id'));

    if (response.statusCode == 200) {
      Note note = Note.fromJson(json.decode(response.body));
      Navigator.pop(context, true);
      return note;
    } else {
      throw Exception('Failed to delete note!');
    }
  }
}
