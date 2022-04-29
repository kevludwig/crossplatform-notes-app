import 'package:flutter/material.dart';
import 'package:flutterapp/models/note.dart';
import 'package:flutterapp/routes/create_note.dart';
import 'package:flutterapp/routes/note_details.dart';
import 'package:flutterapp/services/api.dart';
import 'package:flutterapp/widgets/note_list.dart';
import 'package:flutterapp/widgets/ui/floating_button.dart';
import 'package:flutterapp/widgets/ui/layout.dart';

/// The main screen of the app.
class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<Note>> notes;

  @override
  void initState() {
    notes = Api.getNotes();
    super.initState();
  }

  Future<void> refreshList() async {
    setState(() {
      notes = Api.getNotes();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Layout(
      title: "Notes",
      body: FutureBuilder(
        future: notes,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<Note> data = snapshot.data as List<Note>;
            return RefreshIndicator(
                onRefresh: refreshList,
                child: NoteList(
                  notes: data,
                  navigate: (index) {
                    Navigator.of(context)
                        .push(
                      MaterialPageRoute(
                          builder: (context) => NoteDetailsRoute(
                                note: data[index],
                              )),
                    )
                        .then((value) {
                      setState(() {
                        // refresh on back if prop is true
                        value ? refreshList() : null;
                      });
                    });
                  },
                ));
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}'),
            );
          } else {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
        },
      ),
      floatingActionButton: FloatingButton(onPressed: () {
        Navigator.of(context)
            .push(MaterialPageRoute(
              builder: (context) => const CreateNoteRoute(),
            ))
            .then((value) => setState(
                  () {
                    value ? refreshList() : null;
                  },
                ));
      }),
    );
  }
}
