package com.example.comp1786_l5_android_persistence.dao;

import android.database.Cursor;
import androidx.room.EntityDeletionOrUpdateAdapter;
import androidx.room.EntityInsertionAdapter;
import androidx.room.RoomDatabase;
import androidx.room.RoomSQLiteQuery;
import androidx.room.SharedSQLiteStatement;
import androidx.room.util.CursorUtil;
import androidx.room.util.DBUtil;
import androidx.sqlite.db.SupportSQLiteStatement;
import com.example.comp1786_l5_android_persistence.Models.Hike;
import java.lang.Class;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@SuppressWarnings({"unchecked", "deprecation"})
public final class HikeDao_Impl implements HikeDao {
  private final RoomDatabase __db;

  private final EntityInsertionAdapter<Hike> __insertionAdapterOfHike;

  private final EntityDeletionOrUpdateAdapter<Hike> __deletionAdapterOfHike;

  private final EntityDeletionOrUpdateAdapter<Hike> __updateAdapterOfHike;

  private final SharedSQLiteStatement __preparedStmtOfDeleteAllHikes;

  public HikeDao_Impl(RoomDatabase __db) {
    this.__db = __db;
    this.__insertionAdapterOfHike = new EntityInsertionAdapter<Hike>(__db) {
      @Override
      public String createQuery() {
        return "INSERT OR ABORT INTO `hikes` (`hike_id`,`name`,`location`,`date`,`parking`,`length`,`level`,`description`) VALUES (nullif(?, 0),?,?,?,?,?,?,?)";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Hike value) {
        stmt.bindLong(1, value.hike_id);
        if (value.name == null) {
          stmt.bindNull(2);
        } else {
          stmt.bindString(2, value.name);
        }
        if (value.location == null) {
          stmt.bindNull(3);
        } else {
          stmt.bindString(3, value.location);
        }
        if (value.date == null) {
          stmt.bindNull(4);
        } else {
          stmt.bindString(4, value.date);
        }
        if (value.parking == null) {
          stmt.bindNull(5);
        } else {
          stmt.bindString(5, value.parking);
        }
        stmt.bindLong(6, value.length);
        if (value.level == null) {
          stmt.bindNull(7);
        } else {
          stmt.bindString(7, value.level);
        }
        if (value.description == null) {
          stmt.bindNull(8);
        } else {
          stmt.bindString(8, value.description);
        }
      }
    };
    this.__deletionAdapterOfHike = new EntityDeletionOrUpdateAdapter<Hike>(__db) {
      @Override
      public String createQuery() {
        return "DELETE FROM `hikes` WHERE `hike_id` = ?";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Hike value) {
        stmt.bindLong(1, value.hike_id);
      }
    };
    this.__updateAdapterOfHike = new EntityDeletionOrUpdateAdapter<Hike>(__db) {
      @Override
      public String createQuery() {
        return "UPDATE OR ABORT `hikes` SET `hike_id` = ?,`name` = ?,`location` = ?,`date` = ?,`parking` = ?,`length` = ?,`level` = ?,`description` = ? WHERE `hike_id` = ?";
      }

      @Override
      public void bind(SupportSQLiteStatement stmt, Hike value) {
        stmt.bindLong(1, value.hike_id);
        if (value.name == null) {
          stmt.bindNull(2);
        } else {
          stmt.bindString(2, value.name);
        }
        if (value.location == null) {
          stmt.bindNull(3);
        } else {
          stmt.bindString(3, value.location);
        }
        if (value.date == null) {
          stmt.bindNull(4);
        } else {
          stmt.bindString(4, value.date);
        }
        if (value.parking == null) {
          stmt.bindNull(5);
        } else {
          stmt.bindString(5, value.parking);
        }
        stmt.bindLong(6, value.length);
        if (value.level == null) {
          stmt.bindNull(7);
        } else {
          stmt.bindString(7, value.level);
        }
        if (value.description == null) {
          stmt.bindNull(8);
        } else {
          stmt.bindString(8, value.description);
        }
        stmt.bindLong(9, value.hike_id);
      }
    };
    this.__preparedStmtOfDeleteAllHikes = new SharedSQLiteStatement(__db) {
      @Override
      public String createQuery() {
        final String _query = "DELETE FROM Hikes";
        return _query;
      }
    };
  }

  @Override
  public long insertHike(final Hike hike) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      long _result = __insertionAdapterOfHike.insertAndReturnId(hike);
      __db.setTransactionSuccessful();
      return _result;
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void deleteHike(final Hike hike) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __deletionAdapterOfHike.handle(hike);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void updateHike(final Hike hike) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __updateAdapterOfHike.handle(hike);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void deleteAllHikes() {
    __db.assertNotSuspendingTransaction();
    final SupportSQLiteStatement _stmt = __preparedStmtOfDeleteAllHikes.acquire();
    __db.beginTransaction();
    try {
      _stmt.executeUpdateDelete();
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
      __preparedStmtOfDeleteAllHikes.release(_stmt);
    }
  }

  @Override
  public List<Hike> getAllHike() {
    final String _sql = "SELECT * FROM Hikes ORDER BY name";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfHikeId = CursorUtil.getColumnIndexOrThrow(_cursor, "hike_id");
      final int _cursorIndexOfName = CursorUtil.getColumnIndexOrThrow(_cursor, "name");
      final int _cursorIndexOfLocation = CursorUtil.getColumnIndexOrThrow(_cursor, "location");
      final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
      final int _cursorIndexOfParking = CursorUtil.getColumnIndexOrThrow(_cursor, "parking");
      final int _cursorIndexOfLength = CursorUtil.getColumnIndexOrThrow(_cursor, "length");
      final int _cursorIndexOfLevel = CursorUtil.getColumnIndexOrThrow(_cursor, "level");
      final int _cursorIndexOfDescription = CursorUtil.getColumnIndexOrThrow(_cursor, "description");
      final List<Hike> _result = new ArrayList<Hike>(_cursor.getCount());
      while(_cursor.moveToNext()) {
        final Hike _item;
        _item = new Hike();
        _item.hike_id = _cursor.getLong(_cursorIndexOfHikeId);
        if (_cursor.isNull(_cursorIndexOfName)) {
          _item.name = null;
        } else {
          _item.name = _cursor.getString(_cursorIndexOfName);
        }
        if (_cursor.isNull(_cursorIndexOfLocation)) {
          _item.location = null;
        } else {
          _item.location = _cursor.getString(_cursorIndexOfLocation);
        }
        if (_cursor.isNull(_cursorIndexOfDate)) {
          _item.date = null;
        } else {
          _item.date = _cursor.getString(_cursorIndexOfDate);
        }
        if (_cursor.isNull(_cursorIndexOfParking)) {
          _item.parking = null;
        } else {
          _item.parking = _cursor.getString(_cursorIndexOfParking);
        }
        _item.length = _cursor.getInt(_cursorIndexOfLength);
        if (_cursor.isNull(_cursorIndexOfLevel)) {
          _item.level = null;
        } else {
          _item.level = _cursor.getString(_cursorIndexOfLevel);
        }
        if (_cursor.isNull(_cursorIndexOfDescription)) {
          _item.description = null;
        } else {
          _item.description = _cursor.getString(_cursorIndexOfDescription);
        }
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public Hike getHikeById(final long id) {
    final String _sql = "SELECT * FROM Hikes WHERE hike_id = ?";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    _statement.bindLong(_argIndex, id);
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfHikeId = CursorUtil.getColumnIndexOrThrow(_cursor, "hike_id");
      final int _cursorIndexOfName = CursorUtil.getColumnIndexOrThrow(_cursor, "name");
      final int _cursorIndexOfLocation = CursorUtil.getColumnIndexOrThrow(_cursor, "location");
      final int _cursorIndexOfDate = CursorUtil.getColumnIndexOrThrow(_cursor, "date");
      final int _cursorIndexOfParking = CursorUtil.getColumnIndexOrThrow(_cursor, "parking");
      final int _cursorIndexOfLength = CursorUtil.getColumnIndexOrThrow(_cursor, "length");
      final int _cursorIndexOfLevel = CursorUtil.getColumnIndexOrThrow(_cursor, "level");
      final int _cursorIndexOfDescription = CursorUtil.getColumnIndexOrThrow(_cursor, "description");
      final Hike _result;
      if(_cursor.moveToFirst()) {
        _result = new Hike();
        _result.hike_id = _cursor.getLong(_cursorIndexOfHikeId);
        if (_cursor.isNull(_cursorIndexOfName)) {
          _result.name = null;
        } else {
          _result.name = _cursor.getString(_cursorIndexOfName);
        }
        if (_cursor.isNull(_cursorIndexOfLocation)) {
          _result.location = null;
        } else {
          _result.location = _cursor.getString(_cursorIndexOfLocation);
        }
        if (_cursor.isNull(_cursorIndexOfDate)) {
          _result.date = null;
        } else {
          _result.date = _cursor.getString(_cursorIndexOfDate);
        }
        if (_cursor.isNull(_cursorIndexOfParking)) {
          _result.parking = null;
        } else {
          _result.parking = _cursor.getString(_cursorIndexOfParking);
        }
        _result.length = _cursor.getInt(_cursorIndexOfLength);
        if (_cursor.isNull(_cursorIndexOfLevel)) {
          _result.level = null;
        } else {
          _result.level = _cursor.getString(_cursorIndexOfLevel);
        }
        if (_cursor.isNull(_cursorIndexOfDescription)) {
          _result.description = null;
        } else {
          _result.description = _cursor.getString(_cursorIndexOfDescription);
        }
      } else {
        _result = null;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  public static List<Class<?>> getRequiredConverters() {
    return Collections.emptyList();
  }
}
