#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""test."""
import json


def save(data, path):
    """test."""
    d = json.dumps(data, indent=2, ensure_ascii=False)
    with open(path, 'w') as f:
        f.write(d)


def load(path):
    with open(path, 'r') as f:
        data = f.read()
        return json.loads(data)


class person(object):
    def __init__(self, form):
        self.name = form.get('name', '')
        self.sex = form.get('sex', '')
        self.age = form.get('age', 0)

    @classmethod
    def new(cls, form, **kwargs):
        p = cls(form)
        for k, v in kwargs.items():
            setattr(p, k, v)
        p.save()
        return p

    @classmethod
    def new_from_dict(cls, dic):
        p = cls({})
        for k, v in dic.items():
            setattr(p, k, v)
        return p

    @classmethod
    def all(cls):
        path = cls.path()
        persons = load(path)
        ps = [cls.new_from_dict(p) for p in persons]
        return ps

    @classmethod
    def path(cls):
        name = cls.__class__.__name__
        path = '{}.text'.format(name)
        return path

    def save(self):
        ps = self.all()
        ps = ps.append(self)
        data = [p.__dict__ for p in ps]
        path = self.path()
        save(data, path)
