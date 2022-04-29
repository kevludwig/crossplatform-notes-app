import 'package:flutter/material.dart';

/// App Layout widget.
class Layout extends StatelessWidget {
  final String title;
  final Widget? leading;
  final Widget body;
  final FloatingActionButton? floatingActionButton;

  const Layout(
      {Key? key,
      required this.title,
      this.leading,
      required this.body,
      this.floatingActionButton})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title), leading: leading),
      body: body,
      floatingActionButton: floatingActionButton,
    );
  }
}
