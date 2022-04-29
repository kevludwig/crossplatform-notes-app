import 'package:flutter/material.dart';
import 'package:flutterapp/services/api.dart';
import 'package:flutterapp/widgets/ui/layout.dart';

class CreateNoteRoute extends StatefulWidget {
  const CreateNoteRoute({Key? key}) : super(key: key);

  @override
  _CreateNoteRouteState createState() => _CreateNoteRouteState();
}

class _CreateNoteRouteState extends State<CreateNoteRoute> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  final titleController = TextEditingController();
  String title = "";
  final bodyController = TextEditingController();
  String body = "";

  @override
  void initState() {
    titleController.text = title;
    bodyController.text = body;
    return super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Layout(
        title: "New Note",
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
                  TextField(
                    controller: titleController,
                    decoration: const InputDecoration(labelText: 'Title'),
                    autocorrect: false,
                    onChanged: (value) => title = value,
                  ),
                  TextField(
                    controller: bodyController,
                    decoration: const InputDecoration(labelText: 'Body'),
                    autocorrect: false,
                    maxLines: 5,
                    maxLength: 500,
                    onChanged: (value) => body = value,
                  ),
                  Row(mainAxisAlignment: MainAxisAlignment.end, children: [
                    ElevatedButton(
                      onPressed: () async {
                        await Api.createNote({
                          "title": titleController.text,
                          "body": bodyController.text,
                        });
                        Navigator.pop(context, true);
                      },
                      child: const Text("Create"),
                    ),
                  ]),
                ])))));
  }
}
