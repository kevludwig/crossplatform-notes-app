import 'package:flutter/material.dart';
import 'package:flutterapp/models/note.dart';
import 'package:flutterapp/services/api.dart';
import 'package:flutterapp/widgets/ui/layout.dart';

class NoteDetailsRoute extends StatefulWidget {
  final Note note;
  const NoteDetailsRoute({Key? key, required this.note}) : super(key: key);

  @override
  _NoteDetailsRouteState createState() => _NoteDetailsRouteState();
}

class _NoteDetailsRouteState extends State<NoteDetailsRoute> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  final titleController = TextEditingController();
  String title = "";
  final bodyController = TextEditingController();
  String body = "";

  @override
  void initState() {
    title = widget.note.title;
    body = widget.note.body;

    titleController.text = title;
    bodyController.text = body;
    return super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Layout(
        title: widget.note.title,
        leading: BackButton(
          onPressed: () {
            Navigator.pop(context, false);
          },
        ),
        body: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
            child: (Form(
                key: formKey,
                child: Column(children: [
                  TextFormField(
                    controller: titleController,
                    decoration: const InputDecoration(labelText: 'Title'),
                    onChanged: (value) => title = value,
                  ),
                  TextFormField(
                    controller: bodyController,
                    decoration: const InputDecoration(labelText: 'Body'),
                    maxLines: 5,
                    maxLength: 500,
                    onChanged: (value) => body = value,
                  ),
                  Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        ElevatedButton(
                          onPressed: () async {
                            await Api.deleteNote(widget.note.id, context);
                          },
                          style: ElevatedButton.styleFrom(
                            primary: Colors.red,
                          ),
                          child: const Text("Delete"),
                        ),
                        ElevatedButton(
                          onPressed: () async {
                            await Api.updateNote(widget.note.id, {
                              "title": titleController.text,
                              "body": bodyController.text,
                            });
                            Navigator.pop(context, true);
                          },
                          child: const Text("Update"),
                        ),
                      ]),
                ])))));
  }
}
