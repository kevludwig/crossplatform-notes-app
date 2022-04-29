import 'package:flutter/material.dart';
import 'package:flutterapp/models/note.dart';
import 'package:flutterapp/widgets/note_item.dart';

/// The note list widget.
class NoteList extends StatelessWidget {
  final List<Note> notes;
  final Function navigate;

  const NoteList({Key? key, required this.notes, required this.navigate})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: notes.length,
        itemBuilder: (context, index) {
          return NoteItem(note: notes[index], onTap: () => navigate(index));
        });
  }
}
