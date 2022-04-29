import 'package:flutter/material.dart';
import 'package:flutterapp/models/note.dart';

/// The note item widget.
class NoteItem extends StatelessWidget {
  final Note note;
  final Function onTap;
  const NoteItem({Key? key, required this.note, required this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.only(top: 20),
        child: ListTile(
            title: Text(note.title),
            subtitle: Text(note.body, maxLines: 2),
            onTap: () {
              onTap();
            }));
  }
}
