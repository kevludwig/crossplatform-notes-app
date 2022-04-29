import 'package:flutter/material.dart';

/// The FloatingActionButton that can be used to add a new note.
class FloatingButton extends FloatingActionButton {
  const FloatingButton({Key? key, required VoidCallback? onPressed})
      : super(key: key, onPressed: onPressed);

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
        key: key,
        onPressed: onPressed,
        backgroundColor: Colors.blue,
        child: const Icon(Icons.add));
  }
}
